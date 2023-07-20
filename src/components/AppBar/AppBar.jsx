import * as React from "react";
import AppleIcon from "@mui/icons-material/Apple";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Typography,
  AppBar,
  Box,
  Toolbar,
  Container,
  Button,
  MenuItem,
  InputBase,
  alpha,
  IconButton,
} from "@mui/material";
import AuthModal from "../Modal/ModalAuth";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../../redux/auth/authSelectors";
import { logOut } from "../../redux/auth/authOperations";
import { logout } from "../../redux/auth/authSlice";

const pages = [
  {
    category: "Iphone",
    models: [
      "iPhone 14 Pro Max",
      "iPhone 14 Pro",
      "iPhone 14",
      "iPhone 13 Pro Max",
      "iPhone 13 Pro",
      "iPhone 13",
      "iPhone 13 mini",
      "iPhone 12",
    ],
  },
  {
    category: "Ipad",
    models: [
      "iPad 10.9 2022",
      "iPad Air",
      "iPad Pro 12.9 2022",
      "iPad Pro 11 2022",
      "iPad mini 6",
    ],
  },
  {
    category: "Watch",
    models: [
      "Watch Series 8 41mm",
      "Watch Series 8 45mm",
      "Watch SE 2 40mm",
      "Watch SE 2 44mm",
      "Watch Ultra 49mm",
    ],
  },
  {
    category: "Headphones",
    models: ["AirPods Max", "AirPods Pro 2", "AirPods 3", "AirPods 2"],
  },
];

function HeaderAppBar() {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [isLoginModalOpen, setLoginModalOpen] = React.useState(false);
  const isAuthorized = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  const handleCategoryMouseEnter = (category) => {
    setSelectedCategory(category);
  };

  const handleCategoryMouseLeave = () => {
    setSelectedCategory(null);
  };

  const isCategorySelected = (category) => {
    return selectedCategory === category;
  };

  const handleSignOut = async () => {
    await logOut();
    dispatch(logout());
  };

  React.useEffect(() => {
    if (isAuthorized !== null) {
      setLoginModalOpen(false);
      navigate("user");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <AppBar position="static" sx={{ zIndex: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AppleIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AppleHub
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", flexWrap: "nowrap" }}>
            {pages.map((page) => (
              <Box
                key={page.category}
                sx={{ position: "relative" }}
                onMouseEnter={() => handleCategoryMouseEnter(page.category)}
                onMouseLeave={() => handleCategoryMouseLeave(page.category)}
              >
                <Button
                  component={Link}
                  to={`/${page.category.toLowerCase()}`}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textDecoration: "none",
                    marginRight: "10px",
                  }}
                >
                  {page.category}
                </Button>
                {isCategorySelected(page.category) && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      backgroundColor: "white",
                      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
                      padding: "10px",
                      zIndex: 2,
                    }}
                  >
                    {page.models.map((model) => (
                      <MenuItem key={model}>
                        <Link
                          to={`/${page.category.toLowerCase()}/${model
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/\./g, "-")}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <Typography textAlign="center">{model}</Typography>
                        </Link>
                      </MenuItem>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 0 }}>
            {!isAuthorized ? (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                style={{ color: "white" }}
                onClick={handleLoginModalOpen}
              >
                <AccountCircle />
              </IconButton>
            ) : (
              <>
                <Link to="/user">
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    style={{ color: "white" }}
                  >
                    <AccountCircle />
                  </IconButton>
                </Link>
                <IconButton
                  size="large"
                  aria-label="logout"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  style={{ color: "white" }}
                  onClick={handleSignOut}
                >
                  <LogoutIcon />
                </IconButton>
              </>
            )}

            <IconButton aria-label="cart" color="inherit">
              <ShoppingCartIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <AuthModal open={isLoginModalOpen} onClose={handleLoginModalClose} />
    </AppBar>
  );
}

export default HeaderAppBar;
