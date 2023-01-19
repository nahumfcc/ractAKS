namespace UsersAPI.Domain
{
    public class Result
    {
        //protected internal Result(bool isSuccess, Error error) {
        //    if (isSuccess && Error.None)
        //    {
        //        throw new InvalidOperationException();
        //    }
        //    if (!isSuccess && error == Error.None)
        //    {
        //        throw new InvalidOperationException();
        //    }
        //    IsSuccess = isSuccess;
        //    Error = error;
        //}

        public bool IsSuccess { get; set; }

        public bool IsFailure => !IsSuccess;

        public string Error { get; }
    }
}
