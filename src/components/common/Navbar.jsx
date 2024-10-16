import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../service/firebaseConfig"; // Correct Firebase import
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase functions

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // To toggle between Sign Up and Sign In
  const [error, setError] = useState(""); // State for error messages

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEmailSignUp = async () => {
    setError(""); // Reset error state
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify(user));
      setOpenDialog(false);
      navigate("/my-trips");
    } catch (error) {
      console.error("Sign-up error:", error);
      setError(error.message); // Set error message for sign-up
    }
  };

  const handleEmailSignIn = async () => {
    setError(""); // Reset error state
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify(user));
      setOpenDialog(false);
      navigate("/my-trips");
    } catch (error) {
      console.error("Sign-in error:", error);
      setError(error.message); // Set error message for sign-in
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      handleEmailSignUp(); // Call sign-up function
    } else {
      handleEmailSignIn(); // Call sign-in function
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Error during logout. Please try again.");
    }
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <Link to="/">
        <img src="/logomain.jpg" className="w-28 md:w-40" alt="Logo" />
      </Link>

      <div>
        {user ? (
          <div className="flex justify-center items-center gap-1 md:gap-3">
            <Link to="/create-trip">
              <Button variant="outline" className="rounded-full">
                Create Trips
              </Button>
            </Link>
            <Link to="/my-trips">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </Link>
            <Button variant="outline" className="rounded-full" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpenDialog(true)}>Sign In / Sign Up</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <h2 className="font-bold text-lg mt-7">{isSignUp ? "Sign Up" : "Sign In"}</h2>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border p-2 w-full mt-2"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border p-2 w-full mt-2"
                    />
                    <Button className="w-full mt-5" type="submit">
                      {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                  </form>
                  {error && <p className="text-red-500 mt-2">{error}</p>} 
                  <button
                    className="mt-2 text-blue-500"
                    onClick={() => setIsSignUp(!isSignUp)} 
                  >
                    {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                  </button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};
