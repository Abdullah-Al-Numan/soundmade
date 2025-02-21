const ErrorMessage = ({errorMessage}:{
    errorMessage?:string | null;
}) => {
  return (
    <div>
    {errorMessage && (
        <p className="text-red-500 text-sm mt-1 ">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export default ErrorMessage
