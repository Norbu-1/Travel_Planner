import { Navbar } from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  selectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { auth } from "@/service/firebaseConfig"; 
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { Loading } from "@/components/common/Loading";
import { useNavigate } from "react-router-dom";
import { destinationData } from "../../service/desDetail";
// Mock data for different destinations


export const CreateTrip = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const locationsData = [
    { label: "New York", value: "new-york" },
    { label: "Los Angeles", value: "los-angeles" },
    { label: "Chicago", value: "chicago" },
    { label: "Houston", value: "houston" },
    { label: "Miami", value: "miami" },
    { label: "Denver", value: "denver" },
    { label: "San Francisco", value: "san-francisco" },
    { label: "Seattle", value: "seattle" },
    { label: "Orlando", value: "orlando" },
    { label: "Las Vegas", value: "las-vegas" },
  ];
  

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const generateTrip = async () => {
    let errorMessage = "";

    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 5 || formData?.noOfDays <= 0) {
      errorMessage = "Number of days should be between 1 and 5.";
    } else {
      if (!formData?.location) {
        errorMessage = "Location is required.";
      } else if (!formData?.budget) {
        errorMessage = "Budget is required.";
      } else if (!formData?.traveller) {
        errorMessage = "Traveller details are required.";
      }
    }

    if (errorMessage) {
      toast(errorMessage);
      return;
    }

    setLoading(true);

    // Fetch hotels and plans based on selected location
    const selectedLocationKey = formData.location?.value;
    const tripData = destinationData[selectedLocationKey];

    if (!tripData) {
      toast("No data available for the selected location.");
      setLoading(false);
      return;
    }

    saveTrip(JSON.stringify(tripData)); // Save the selected trip data
  };

  const saveTrip = async (tripData) => {
    setLoading(true);
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));

    let parsedTripData;
    try {
      console.log(tripData);
      parsedTripData = JSON.parse(tripData);
    } catch (error) {
      console.error("Error parsing tripData:", error);
      toast("An error occurred while parsing the trip data.");
      setLoading(false);
      return;
    }

    if (!user || !user.email) {
      console.error("User is not authenticated");
      toast("You need to log in to save a trip.");
      setLoading(false);
      return;
    }

    try {
      await setDoc(doc(db, "trips", docId), {
        userSelection: formData,
        tripData: parsedTripData,
        userEmail: user?.email,
        id: docId,
      });
      setLoading(false);
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      setLoading(false);
      console.error("Error saving trip:", error);
      toast("An error occurred while saving the trip.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = { email };
      localStorage.setItem("user", JSON.stringify(user));
      setOpenDialog(false);
      generateTrip();
    } catch (error) {
      console.error("Sign-in error:", error);
      setError(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Ready to Craft Your Dream Adventure? 🌍✈️</h2>
<p className="mt-3 text-gray-500 text-lg">
  Let's make your next getaway unforgettable! Just share a few details, and we'll design a tailor-made itinerary filled with your favorite experiences. Adventure, relaxation, or a bit of both—your perfect trip starts here. 🌟
</p>


        <div className="mt-10 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-3 font-medium">What is the destination of choice? *</h2>
            <select
              value={selectedLocation?.value || ""}
              onChange={(e) => {
                const selected = locationsData.find(
                  (location) => location.value === e.target.value
                );
                setSelectedLocation(selected);
                handleInputChange("location", selected);
              }}
              className="w-full p-2 border rounded-md"
            >
              <option value="" disabled>Select a location</option>
              {locationsData.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">How many days are you planning your trip? *</h2>
            <Input
              placeholder={" Ex. 3 "}
              type="number"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget ? *</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
  {selectBudgetOptions.map((item, index) => (
    <div
      key={index}
      className={`p-6 bg-white border cursor-pointer rounded-xl hover:shadow-2xl hover:bg-gradient-to-tr from-green-100 to-green-50 transform transition-transform duration-300 hover:-translate-y-2 shadow-md ${
        formData?.budget === item.title && "shadow-xl border-black bg-gradient-to-tr from-green-200 to-green-100"
      }`}
      onClick={() => handleInputChange("budget", item.title)}
    >
      <div className="flex items-center justify-center mb-4 text-green-500 text-5xl">
        {item.icon}
      </div>
      <h2 className="font-semibold text-xl text-center text-gray-700 mb-2">
        {item.title}
      </h2>
      <p className="text-center text-gray-500 text-sm">{item.desc}</p>
    </div>
  ))}
</div>

        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with on your next adventure? *</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
  {SelectTravelsList.map((item, index) => (
    <div
      key={index}
      className={`p-6 bg-white border cursor-pointer rounded-xl hover:shadow-2xl hover:bg-gradient-to-tr from-blue-100 to-blue-50 transform transition-transform duration-300 hover:-translate-y-2 shadow-md ${
        formData?.traveller === item.people && "shadow-xl border-black bg-gradient-to-tr from-blue-200 to-blue-100"
      }`}
      onClick={() => handleInputChange("traveller", item.people)}
    >
      <div className="flex items-center justify-center mb-4 text-blue-500 text-5xl">
        {item.icon}
      </div>
      <h2 className="font-semibold text-xl text-center text-gray-700 mb-2">
        {item.title}
      </h2>
      <p className="text-center text-gray-500 text-sm">{item.desc}</p>
    </div>
  ))}
</div>

        </div>
        <div className="my-10 flex justify-center">
          <Button onClick={generateTrip} disabled={loading} className="w-full">
            Generate Trip {loading && <Loading />}
          </Button>
        </div>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <h2 className="font-bold text-lg mt-7">Sign In</h2>
                <p> Sign In to the App with email and password </p>
                <form onSubmit={handleSubmit}>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4"
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4"
                  />
                  <Button type="submit" className="mt-5">
                    Sign In
                  </Button>
                  {error && <p className="text-red-500">{error}</p>}
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
