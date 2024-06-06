import { Component } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { countries } from "../../assets/javascript/country";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import image from "../../assets/images/form_image.png";

interface FormData {
  full_name: string;
  email: string;
  country: number;
  phone_number: string;
  password: string;
}

interface Errors {
  full_name: string;
  email: string;
  phone_number: string;
}

interface State {
  formData: FormData;
  errors: Errors;
  isPasswordVisible: boolean;
  isTermsAndCondition: boolean;
  passwordRequirementsMet: boolean[];
  passwordFocused: boolean;
  passwordError: boolean;
  windowWidth:number;
}

export default class Form extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      formData: {
        full_name: "",
        email: "",
        country: 1,
        phone_number: "",
        password: "",
      },
      isPasswordVisible: false,
      isTermsAndCondition: false,
      errors: {
        full_name: "",
        email: "",
        phone_number: "",
      },
      passwordRequirementsMet: [false, false, false, false],
      passwordFocused: false,
      passwordError: false,
      windowWidth:window.innerWidth
    };
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handlePasswordFocus = this.handlePasswordFocus.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  handleDataChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    let message: string = "";

    if (name === "full_name") {
      message = value.length === 0 ? "Please Enter Your Name" : "";
    } else if (name === "phone_number") {
      message =
        value.length === 0
          ? "Please Enter Phone Number"
          : value.length > 0 && value.length !== 10
          ? "Please Enter 10 Digit Number"
          : "";
    } else if (name === "email") {
      const emailRegex = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      message = emailRegex.test(value) ? "" : "Please Enter Valid Email";
    } else {
      message = "";
    }

    this.setState({
      ...this.state,
      formData: { ...this.state.formData, [e.target.name]: value },
      errors: { ...this.state.errors, [e.target.name]: message },
    });
  }

  handlePasswordFocus() {
    this.setState({ ...this.state, passwordFocused: true });
  }

  validatePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const password: string = e.target.value;

    const requirementsMet: boolean[] = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
    ];

    const hasFalse: boolean = requirementsMet.some((value) => value === false);

    this.setState({
      ...this.state,
      formData: { ...this.state.formData, password: password },
      passwordRequirementsMet: requirementsMet,
      passwordError: !(!hasFalse && this.state.passwordFocused),
    });
  }

  handleCountryChange(e: SelectChangeEvent<number>) {
    this.setState({
      ...this.state,
      formData: { ...this.state.formData, country: Number(e.target.value) },
    });
  }

  handleSubmit() {
    const { formData, errors, isTermsAndCondition, passwordRequirementsMet } =
      this.state;
    let isAllFilled = Object.values(this.state.formData).some(
      (value) => value.length === 0
    );
    const hasErrors = Object.values(errors).some((error) => error.length > 0);
    const hasPasswordErrors = Object.values(passwordRequirementsMet).some(
      (error) => error === false
    );

    if (
      !hasErrors &&
      !isAllFilled &&
      isTermsAndCondition &&
      !hasPasswordErrors &&
      formData.phone_number.length === 10
    ) {
      console.log("Submitting form data:", formData);
    } else {
      const updatedErrors = { ...errors };

      if (formData.full_name === "") {
        updatedErrors.full_name = "Please enter your full name.";
      } else {
        updatedErrors.full_name = "";
      }

      const emailRegex = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      if (!emailRegex.test(formData.email)) {
        updatedErrors.email = "Please enter a valid email address.";
      } else {
        updatedErrors.email = "";
      }

      if (
        formData.phone_number.length != 10 &&
        formData.phone_number.length > 0
      ) {
        updatedErrors.phone_number = "Please enter 10 Digit number.";
      } else if (formData.phone_number.length == 0) {
        updatedErrors.phone_number = "Please enter Phone number.";
      } else {
        updatedErrors.phone_number = "";
      }

      this.setState({ errors: updatedErrors });
    }
  }

  render() {
    const { full_name, email, password, phone_number, country } =
      this.state.formData;
    const {
      isTermsAndCondition,
      isPasswordVisible,
      passwordFocused,
      passwordRequirementsMet,
      passwordError,
      windowWidth
    } = this.state;

    const CountryCode = countries.filter((con)=>{
     return con.id == country
    })[0]

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#fafafa",
        }}
      >
        <Stack
          sx={{
            width: {
              xs: 0,
              lg: 2 / 4,
            },
          }}
        >
          <img src={image} />
        </Stack>
        <Stack
          sx={{
            bgcolor: "white",
            boxShadow: 2,
            direction: "column",
            borderRadius: 3,
            p: {
              xs: 3,
              md: 6,
            },
            m: {
              xs: 1,
              md: 3,
            },
            width: {
              lg: 2 / 4,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 18,
                md: 30,
              },
              letterSpacing: 1,
              fontStyle: "bold",
              fontWeight: "700",
            }}
          >
            Need an Account - Sign Up
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 14,
                md: 24,
              },
              fontStyle: "bold",
              fontWeight: "700",
              color: "skyblue",
              marginBottom: 2,
            }}
          >
            Basic Information
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              value={full_name}
              variant="outlined"
              name="full_name"
              size={windowWidth < 600? "small" : "medium" }
              helperText={this.state.errors.full_name}
              error={!!this.state.errors.full_name}
              onChange={this.handleDataChange}
              required
            />
            <TextField
              label="Email"
              inputProps={{
                autoComplete: "off",
              }}
              value={email}
              size={windowWidth < 600? "small" : "medium" }
              variant="outlined"
              name="email"
              helperText={this.state.errors.email}
              error={!!this.state.errors.email}
              onChange={this.handleDataChange}
              autoComplete="disabled"
              required
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Country"
                onChange={this.handleCountryChange}
                value={country}
                size={windowWidth < 600? "small" : "medium" }
              >
                {countries.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    <ListItemIcon>
                      <img
                        src={option.logo}
                        alt={option.countryName}
                        width={20}
                      />
                    </ListItemIcon>
                    {option.countryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Number"
              value={phone_number}
              variant="outlined"
              size={windowWidth < 600? "small" : "medium" }
              name="phone_number"
              helperText={this.state.errors.phone_number}
              error={!!this.state.errors.phone_number}
              onChange={this.handleDataChange}
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {CountryCode.countryCode}-
                  </InputAdornment>
                ),
              }}
              required
            />

            <TextField
              label="Password"
              value={password}
              variant="outlined"
              name="password"
              size={windowWidth < 600? "small" : "medium" }
              onFocus={this.handlePasswordFocus}
              autoComplete="disabled"
              error={passwordError}
              onChange={this.validatePassword}
              type={isPasswordVisible ? "text" : "password"}
              InputProps={{
                autoComplete: "off",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                    size={windowWidth < 600? "small" : "medium" }
                      onClick={() =>
                        this.setState({
                          ...this.state,
                          isPasswordVisible: !isPasswordVisible,
                        })
                      }
                    >
                      {isPasswordVisible ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          </Stack>
          {passwordFocused && (
            <Grid marginTop={0.5} marginBottom={1} container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  display={"flex"}
                  alignItems={"center"}
                  fontSize={{
                    xs:12,
                    md:14
                  }}
                  color={passwordRequirementsMet[0] ? "green" : "red"}
                >
                  {passwordRequirementsMet[0] ? (
                    <CheckCircleIcon />
                  ) : (
                    <CancelIcon />
                  )}{" "}
                  Minimum 8 characters
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  display={"flex"}
                  fontSize={{
                    xs:12,
                    md:14
                  }}
                  alignItems={"center"}
                  color={passwordRequirementsMet[1] ? "green" : "red"}
                >
                  {passwordRequirementsMet[1] ? (
                    <CheckCircleIcon />
                  ) : (
                    <CancelIcon />
                  )}{" "}
                  one Uppercase character
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  display={"flex"}
                  fontSize={{
                    xs:12,
                    md:14
                  }}
                  alignItems={"center"}
                  color={passwordRequirementsMet[2] ? "green" : "red"}
                >
                  {passwordRequirementsMet[2] ? (
                    <CheckCircleIcon />
                  ) : (
                    <CancelIcon />
                  )}{" "}
                  One Lowercase character
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  display={"flex"}
                  fontSize={{
                    xs:12,
                    md:14
                  }}
                  alignItems={"center"}
                  color={passwordRequirementsMet[3] ? "green" : "red"}
                >
                  {passwordRequirementsMet[3] ? (
                    <CheckCircleIcon />
                  ) : (
                    <CancelIcon />
                  )}{" "}
                  One Number
                </Typography>
              </Grid>
            </Grid>
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={isTermsAndCondition}
                size={windowWidth < 600? "small" : "medium" }
                onChange={() =>
                  this.setState({
                    ...this.state,
                    isTermsAndCondition: !isTermsAndCondition,
                  })
                }
                name="I agree to the Terms & Condition"
              />
            }
            label={
              <Typography variant="caption" sx={{
                fontSize:{
                  xs:12,
                  md:16
                }
              }}>I agree to the Terms & Conditions</Typography>
            }
            
          />
          <Button
            variant="contained"
            size={windowWidth < 600? "small" : "medium" }
            onClick={this.handleSubmit}
          >
            Sign Up
          </Button>
        </Stack>
      </Box>
    );
  }
}
