import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { validatePassword } from "@/utils/passwordValidation";
import { useMutation } from "@apollo/client";
import { UPDATE_ADMIN_PASSWORD } from "@/gql/profile";
import { GraphQLResponseError } from "@/types";

const PasswordEdit = ({ email }: { email: string }) => {
  const [formData, setFormData] = useState({
    password: "",
    repeatPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [updatePassword] = useMutation(UPDATE_ADMIN_PASSWORD);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setErrorMessage("Please fill out the form correctly.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await updatePassword({
        variables: {
          input: {
            email,
            newPassword: formData.password,
            reNewPassword: formData.repeatPassword,
          },
        },
      });

      const successMessage = data?.updateAdminPassword?.message;
      if (!successMessage) {
        throw new Error("Password update failed.");
      }

      alert("Password updated successfully!");
      setFormData({ password: "", repeatPassword: "" });
      setErrorMessage(null);
    } catch (error) {
      const errorMessage =
        (error as GraphQLResponseError)?.graphQLErrors?.[0]?.message ||
        "Password update failed, please try again.";
      setErrorMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPasswordValid = validatePassword(formData.password);
  const isRepeatPasswordValid = formData.password === formData.repeatPassword;
  const isFormValid = isPasswordValid && isRepeatPasswordValid;

  const renderErrorMessage = (name: keyof typeof formData) => {
    if (name === "password" && !isPasswordValid && formData.password) {
      return (
        <p className="text-red-500 text-sm mt-1">
          Password must include at least 1 uppercase letter, 1 lowercase letter,
          1 digit, 1 special character, and be at least 8 characters long.
        </p>
      );
    }

    if (
      name === "repeatPassword" &&
      !isRepeatPasswordValid &&
      formData.repeatPassword
    ) {
      return (
        <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
      );
    }

    return null;
  };

  const renderInput = (label: string, name: keyof typeof formData) => (
    <div className="text-start" key={name}>
      <Label>{label}</Label>
      <div className="relative">
        <Input
          type={isVisible ? "text" : "password"}
          name={name}
          placeholder={`Enter ${label}`}
          value={formData[name]}
          onChange={handleChange}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {isVisible ? "👁️" : "🔒"}
        </button>
      </div>
      {renderErrorMessage(name)}
    </div>
  );

  return (
    <div className="w-full max-w-md space-y-4 border p-6 rounded-lg shadow-lg">
      <p className="text-2xl text-center font-bold text-gray-900">
        Update Password
      </p>

      {renderInput("Password", "password")}
      {renderInput("Repeat Password", "repeatPassword")}

      {errorMessage && (
        <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
      )}

      <div className="w-full mt-4">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!isFormValid || isSubmitting}
          onClick={handleUpdatePassword}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  );
};

export default PasswordEdit;
