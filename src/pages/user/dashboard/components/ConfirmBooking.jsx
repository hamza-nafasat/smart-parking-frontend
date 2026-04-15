/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BackIcon, PinIcon, T20for7Icon } from '../../../../assets/svgs/Icon';
import Button from '../../../../components/shared/small/Button';
import { useCreateBookingMutation, useDeleteSingleBookingMutation } from '../../../../redux/apis/bookingApis';
import { useCreatePaymentIntentMutation } from '../../../../redux/apis/paymentApis';
import { removeBookingInDetails } from '../../../../redux/slices/bookingSlice';
import { timeFormate } from '../../../../utils/features';
import { useState } from 'react';
import { useUpdateMyProfileMutation } from '../../../../redux/apis/authApis';

const ConfirmBooking = () => {
  const dispatch = useDispatch();
  const [createBooking] = useCreateBookingMutation();
  const [deleteBooking] = useDeleteSingleBookingMutation();
  const { booking } = useSelector((state) => state?.booking);
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateMyProfileMutation();

  const { user } = useSelector((state) => state?.auth);
  console.log('booking', booking);
  console.log('user', user);
  const calculateOvertimeFee = (minutes) => {
    if (!minutes || minutes <= 0) {
      return 0;
    }
    // Under 60 minutes
    if (minutes <= 60) {
      return 10;
    }

    // Between 61 and 120 minutes
    if (minutes <= 120) {
      return 20;
    }

    // Above 120 minutes
    const extraMinutes = minutes - 120;

    // Count every partial hour as full hour
    const extraHours = Math.ceil(extraMinutes / 60);

    return 20 + extraHours * 10;
  };

  const getMinutesDifference = (startTime, endTime) => {
    let start = new Date(startTime);
    let end = new Date(endTime);

    console.log('start', start);
    console.log('end before fix', end);

    // If end is before start → fix AM/PM issue (add 12 hours instead of 24)
    if (end < start) {
      const diffHours = (start - end) / (1000 * 60 * 60);

      if (diffHours <= 12) {
        // Likely AM/PM mistake → add 12 hours
        end.setHours(end.getHours() + 12);
      } else {
        // Real overnight case → add 24 hours
        end.setDate(end.getDate() + 1);
      }
    }

    console.log('end after fix', end);

    const diffMinutes = Math.floor((end - start) / (1000 * 60));
    return diffMinutes;
  };
  const minutes = getMinutesDifference(booking?.startTime, booking?.endTime);

  console.log('minutes', minutes);
  const overtimeFee = calculateOvertimeFee(user.overtime);
  const actualTimeFee = calculateOvertimeFee(minutes);
  console.log('overtimeFee', overtimeFee);
  console.log('actualTimeFee', actualTimeFee);
  const subtotal = overtimeFee + actualTimeFee;
  const tax = subtotal * 0.1; // 10%
  const totalFee = subtotal + tax;
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const [cardComplete, setCardComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createBookingHandler = async (e) => {
    e.preventDefault();
    if (!cardComplete) return toast.error('Please Enter Card Details');
    setIsLoading(true);
    const { slotId, contactNumber, plateNumber, email, endTime, firstName, lastName, startTime } = booking;
    if (!contactNumber || !plateNumber || !email || !endTime || !firstName || !lastName || !startTime || !slotId)
      return toast.error('Please Select All Fields');
    const data = { slotId, startTime, endTime, firstName, lastName, email, contactNumber, plateNumber };
    try {
      const res = await createBooking(data).unwrap();
      if (res?.success) {
        let bookingId = res?.data?._id;
        try {
          const data = await createPaymentIntent({
            amount: totalFee * 100,
            currency: 'usd',
            bookingId: res?.data?._id,
          }).unwrap();
          const clientSecret = data?.clientSecret;
          const cardElement = elements.getElement(CardElement);
          const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: `${booking.firstName} ${booking.lastName}`,
                email: booking.email,
              },
            },
          });
          if (error) throw error;
          else if (paymentIntent && paymentIntent.status == 'succeeded') {
            toast.success(res?.message);
            dispatch(removeBookingInDetails());
            //here i want to remove the overtime from user profile if there is any also handle the error
            if (user.overtime > 0) {
              try {
                const formData = new FormData();
                formData.append('overtime', 0);

                await updateProfile(formData).unwrap();
              } catch (error) {
                console.error(error);
                toast.error(error?.data?.message || 'Failed to reset overtime');
              }
            }
            navigate('/user');
          } else throw new Error('Something went wrong');
        } catch (error) {
          if (bookingId) await deleteBooking(bookingId);
          console.log('error via create payment intent', error);
        }
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
      console.log('Error in create booking', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row gap-4 py-4">
      <div className="w-[32px] cursor-pointer" onClick={() => navigate(-1)}>
        <BackIcon />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-[500]">Book a parking spot</h1>
          <div>
            <Heading heading="Car & Contact info" />
            <div className="flex flex-col gap-[0.7rem]">
              <List list={{ title: 'First Name', value: booking?.firstName }} />
              <List list={{ title: 'Last Name', value: booking?.lastName }} />
              <List list={{ title: 'License plate', value: booking?.plateNumber }} />
              <List list={{ title: 'Phone number', value: booking?.contactNumber }} />
              <List list={{ title: 'E-mail', value: booking?.email }} />
            </div>

            <Heading heading="Payment Transaction details" />
            {/* <div className="flex flex-col gap-2">
              <List list={{ title: 'From', value: '0232392449343022' }} />
              <List list={{ title: 'To', value: 'company account' }} />
              <List list={{ title: 'Amount', value: '30.00 USD' }} />
            </div> */}

            <CardElement options={{ hidePostalCode: true }} onChange={(event) => setCardComplete(event.complete)} />
            <div className="mt-4 md:mt-6">
              {/* <Link to="/user/payment-success"> */}
              <Button
                onClick={createBookingHandler}
                text="Confirm Booking"
                disabled={isLoading}
                width={`w-full ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
              />
              {/* </Link> */}
            </div>
          </div>
        </div>
        <div className="bg-[#ECECEC] p-4 rounded-lg flex items-center justify-center flex-col gap-3">
          <div className="flex flex-wrap items-center gap-4 ">
            <h5 className="text-sm font-bold text-[#414141]">{booking?.buildingName}</h5>
            <div className="my-1 flex items-center gap-1">
              <PinIcon />
              <p className="text-[10px] font-medium text-[#9FA1A8]">{booking?.buildingAddress}</p>
            </div>
            <div className="my-1 flex items-center gap-1">
              <T20for7Icon />
              <p className="text-[10px] font-medium text-[#9FA1A8]">24 hours CCTV and Parking services</p>
            </div>
          </div>
          <img src={booking?.floorImage} alt="img" className="w-full sm:w-[350px] md:w-[400px]" />
          <div className="w-full px-5 ">
            <List list={{ title: 'From', value: `${booking?.floorName}` }} />
            <List
              list={{ title: 'Date', value: `${timeFormate(booking?.startTime)} - ${timeFormate(booking?.endTime)}` }}
            />
            <List list={{ title: 'Spot', value: booking?.slotName }} />
            <div className="border-y-[2px] border-[#00000070] py-2 my-2">
              <List list={{ title: 'OVER TIME', value: `${overtimeFee.toFixed(2)} USD` }} />
              <List list={{ title: 'Sub total', value: `${actualTimeFee.toFixed(2)} USD` }} />
              <List list={{ title: 'Service fee (10%)', value: `${tax.toFixed(2)} USD` }} />
              <List list={{ title: 'Total', value: `${totalFee.toFixed(2)} USD` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;

const Heading = ({ heading }) => {
  return <h4 className="my-4 text-[#414141] text-base md:text-xl font-bold">{heading}</h4>;
};

const List = ({ list }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <h6 className="text-xs sm:text-sm font-bold text-[#414141]">{list?.title}</h6>
      <p className="text-xs sm:text-sm font-semibold text-[#101B19CC]">{list?.value}</p>
    </div>
  );
};
