import React, { useState } from "react";
import { Input } from "../ui/input";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Button } from "../ui/button";
import { validatePassword } from "@/utils/passwordValidation";
import { validateEmail } from "@/utils/emailValidation";
import { useMutation } from "@apollo/client";
import { ARTIST_ACCOUNT_VALIDATION_MUTATION, REGISTER_MUTATION } from "@/gql";
import { GraphQLResponseError } from "@/types";
import { useRouter } from "next/navigation";
import ErrorMessage from "../errorMessage";

const ArtistCreate = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    repeatPassword: "",
    location: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [accountValidation] = useMutation(ARTIST_ACCOUNT_VALIDATION_MUTATION);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [register] = useMutation(REGISTER_MUTATION);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid =
    Object.values(formData).every((value) => value.trim() !== "") &&
    validateEmail(formData.email) &&
    validatePassword(formData.password) &&
    formData.password === formData.repeatPassword;

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!isFormValid) {
        setErrorMessage("Please fill out the form correctly.");
        return;
      }
    
      setIsSubmitting(true);
    
      try {
        const registerData = {
          username: formData.username,
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          repeat_password: formData.repeatPassword,
          userType: "ARTIST",
          agreesToPrivacyPolicy: true,
          location: {
            lat: 0,
            lng: 0,
            name: formData.location,
            place_id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
          },
        };
    
        const response = await register({
          variables: { registerInput: registerData },
        });
    
        if (!response?.data?.register?.user?.id) {
          throw new Error("User registration failed.");
        }
    
        const validationData = {
          userId: response.data.register.user.id,
          phoneNumber: formData.phone,
          spotify: "",
          youtube: "",
          facebook: "",
          instagram: "",
          soundcloud: "",
        };
    
        await accountValidation({
          variables: { accountValidationInput: validationData },
        });
    
        router.push("/unapproved-artist");
      } catch (error) {
        const graphQLError = (error as GraphQLResponseError)?.graphQLErrors?.[0]?.message;
        setErrorMessage(graphQLError || "Artist creation failed, please try again.");
      } finally {
        setIsSubmitting(false);
      }
    };
    

  return (
    <section className="flex justify-center mt-10">
      <form className="w-full max-w-md space-y-4 border p-6 rounded-lg shadow-lg">
        <p className="text-2xl text-center font-bold text-gray-900">Create Artist Account</p>
        <Input type="text" name="username" placeholder="Username" onChange={handleChange} value={formData.username} />
        <Input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} value={formData.fullName} />

        <div>
          <Input type="email" name="email" placeholder="Enter Email" onChange={handleChange} value={formData.email} />
          {!validateEmail(formData.email) && formData.email && <p className="text-red-500 text-sm mt-1">Invalid email format</p>}
        </div>

        <div>
          <Input type="password" name="password" placeholder="Enter Password" onChange={handleChange} value={formData.password} />
          {!validatePassword(formData.password) && formData.password && (
            <p className="text-red-500 text-sm mt-1">
              Password must include at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long
            </p>
          )}
        </div>

        <Input type="password" name="repeatPassword" placeholder="Repeat Password" onChange={handleChange} value={formData.repeatPassword} />
        <Input type="text" name="location" placeholder="Location" onChange={handleChange} value={formData.location} />

        <hr className="border-gray-300" />

        <PhoneInput defaultCountry="dk" value={formData.phone} onChange={(phone) => setFormData({ ...formData, phone })} />
        <ErrorMessage errorMessage={errorMessage} />
        <Button type="submit" name="submit" onClick={handleSubmit} variant="primary" className="w-full" disabled={!isFormValid || isSubmitting}>Create</Button>
      </form>
    </section>
  );
};

export default ArtistCreate;
