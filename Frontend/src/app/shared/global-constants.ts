export class GlobalConstants {
  //Message
  public static genericError: string = 'Something went wrong';

  //Regex
  public static nameRegex: string = '[a-zA-Z0-9 ]*';

  public static emailRegex: string = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';

  public static contectNumberRegex: string = '^[e0-9]{10,10}$';

  public static passwordRegex: string = '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{3,}';

  public static zipcodeRegex: string = '^[e0-9]{5,5}$';

  public static error: string = 'error';
}
