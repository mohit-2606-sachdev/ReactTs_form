import Form from "../Form"
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

test("Should field present in the document",()=>{
    render(<Form/>)
    const name : HTMLElement = screen.getByRole("textbox",{name:"Full Name"})
    const email  : HTMLElement = screen.getByRole("textbox",{name:"Email"})
    const country : HTMLElement = screen.getByRole("combobox")
    const phone_number : HTMLElement = screen.getByRole("spinbutton",{name:"Number"})
    const passwordInput = screen.getByLabelText(/password/i);
    const checkbox : HTMLElement = screen.getByRole("checkbox")
    const signupButton : HTMLElement = screen.getByRole("button",{name:/Sign Up/i})
    
    expect(name).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(country).toBeInTheDocument()
    expect(phone_number).toBeInTheDocument()
    expect(checkbox).toBeInTheDocument()
    expect(signupButton).toBeInTheDocument()
})

describe("Check the Validations of Full Name",()=>{

    test('updates full name state on input change', () => {
        render(<Form />);
        const name = screen.getByRole("textbox",{name:"Full Name"})
        fireEvent.change(name, { target: { value: 'John Doe' }  } );
        
        expect(name).toHaveValue('John Doe');
    });

    test('Show error full name state on input change', () => {
        render(<Form />);
        let name = screen.getByRole("textbox",{name:"Full Name"})
        fireEvent.change(name, { target: { value: 'John Doe' }  } );
        fireEvent.change(name, { target: { value: '' }  } );
        let error = screen.getByText("Please Enter Your Name")
        expect(error).toBeInTheDocument();
    });

})

describe("Check the Validations ",()=>{

    test('updates phone number state on input change', () => {
        render(<Form />);
        const phone_number : HTMLElement = screen.getByRole("spinbutton",{name:"Number"})
        fireEvent.change(phone_number, { target: { value: 82691921 }  } );
        expect(phone_number).toHaveValue(82691921);
    });

    test('Show error Phone number state on input change', () => {
        render(<Form />);
        const phone_number : HTMLElement = screen.getByRole("spinbutton",{name:"Number"})
        fireEvent.change(phone_number, { target: { value: 82691921 }  } );
        fireEvent.change(phone_number, { target: { value: null }  } );
        let error1 = screen.getByText("Please Enter Phone Number")
        expect(error1).toBeInTheDocument();
        fireEvent.change(phone_number, { target: { value: 8269 }  } );
        let error2 = screen.getByText("Please Enter 10 Digit Number")
        expect(error2).toBeInTheDocument();
    });

})

describe("Check the Validations ",()=>{

    test('updates Email state on input change', () => {
        render(<Form />);
        const email  : HTMLElement = screen.getByRole("textbox",{name:"Email"})
        fireEvent.change(email, { target: { value: "test@gmail.com" }  } );
        expect(email).toHaveValue("test@gmail.com");
    });

    test('Show error Email state on input change', () => {
        render(<Form />);
        const email  : HTMLElement = screen.getByRole("textbox",{name:"Email"})
        fireEvent.change(email, { target: { value: "test@gma" }  } );
        let error1 = screen.getByText("Please Enter Valid Email")
        expect(error1).toBeInTheDocument();
    });

})

describe("Check the Validations ",()=>{

    test('updates Password state on input change', () => {
        render(<Form />);
        const passwordInput = screen.getByLabelText(/password/i);
        fireEvent.change(passwordInput, { target: { value: "Password@2001" }  } );
        expect(passwordInput).toHaveValue("Password@2001");
    });

    test('Show error Password state on input change', async () => {
        render(<Form />);
        const passwordInput = screen.getByLabelText(/password/i);
        fireEvent.focus(passwordInput);
      
        const minimum8Character = screen.getByText(/Minimum 8 characters/i);
        const oneUpperCase = screen.getByText(/one Uppercase character/);
        const oneLowerCase = screen.getByText(/One Lowercase character/);
        const oneNumber = screen.getByText(/One Number/);
      
        expect(minimum8Character).toBeInTheDocument();
        expect(oneUpperCase).toBeInTheDocument();
        expect(oneLowerCase).toBeInTheDocument();
        expect(oneNumber).toBeInTheDocument();
      
        fireEvent.change(passwordInput, { target: { value: "P" }  });
        await waitFor(() => expect(oneUpperCase).toHaveStyle({ color: 'green' }));
      
        fireEvent.change(passwordInput, { target: { value: "Pa" }  });
        await waitFor(() => expect(oneLowerCase).toHaveStyle({ color: 'green' }));
      
        fireEvent.change(passwordInput, { target: { value: "Pass1" }  });
        await waitFor(() =>expect(oneNumber).toHaveStyle({ color: 'green' }));
      
        fireEvent.change(passwordInput, { target: { value: "Pass1234" }  });
        await waitFor(() => expect(minimum8Character).toHaveStyle({ color: 'green' }));
      });

})

describe("Check the Validations ",()=>{
    test('Selects a country from the dropdown menu', async () => {
        render(<Form />);
        const countrySelect = screen.getByLabelText(/Country/i);
        fireEvent.mouseDown(countrySelect);

        const countryOption = screen.getByText('Oman'); 
        fireEvent.click(countryOption);
        
        expect(countrySelect).toHaveTextContent('Oman');
      });
})

describe("Check the Form Validations ",()=>{

    test('Leave The Form Blank', async () => {
        render(<Form />);
        const signupButton : HTMLElement = screen.getByRole("button",{name:/Sign Up/i})

        fireEvent.click(signupButton)

        let number_error = screen.getByText("Please enter Phone number.")
        let name_error = screen.getByText("Please enter your full name.")
        let email_error = screen.getByText("Please enter a valid email address.")
        expect(name_error).toBeInTheDocument();
        expect(number_error).toBeInTheDocument();
        expect(email_error).toBeInTheDocument();

      });

      test('Fill The Form Blank', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        render(<Form />);
        const signupButton : HTMLElement = screen.getByRole("button",{name:/Sign Up/i})

        const name = screen.getByRole("textbox",{name:"Full Name"})
        fireEvent.change(name, { target: { value: 'John Doe' }  } );

        const phone_number : HTMLElement = screen.getByRole("spinbutton",{name:"Number"})
        fireEvent.change(phone_number, { target: { value: 82691921 }  } );

        const email  : HTMLElement = screen.getByRole("textbox",{name:"Email"})
        fireEvent.change(email, { target: { value: "test@gmail.com" }  } );

        const passwordInput = screen.getByLabelText(/password/i);
        fireEvent.change(passwordInput, { target: { value: "Password@2001" }  } );

        const checkbox : HTMLElement = screen.getByRole("checkbox")

        fireEvent.click(checkbox)
        fireEvent.click(signupButton)

        // expect(consoleSpy).toHaveBeenCalledWith('Submitting form data:', {
        //     full_name: 'John Doe',
        //     email: "test@gmail.com",
        //     country: 1,
        //     phone_number: 82691921,
        //     password: "Password@2001"
        //   });
        
        //   consoleSpy.mockRestore();

      });

})