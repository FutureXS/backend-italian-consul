import { IsNotEmpty, IsNumberString } from 'class-validator';

export class AddressDto {
  @IsNotEmpty({
    message: 'Street is required',
  })
  street: string;

  @IsNotEmpty({
    message: 'Neighborhood is required',
  })
  neighborhood: string;

  @IsNotEmpty({
    message: 'City is required',
  })
  city: string;

  @IsNotEmpty({
    message: 'Country is required',
  })
  country: string;

  @IsNotEmpty({
    message: 'Zipcode is required',
  })
  zipcode: string;

  @IsNotEmpty({
    message: 'Number is required',
  })
  @IsNumberString(undefined, {
    message: 'Number must be a string number',
  })
  number: string;
}
