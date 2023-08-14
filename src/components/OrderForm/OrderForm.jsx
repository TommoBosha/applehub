import React from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Button, Checkbox } from "@mui/material";
import { addOrder } from "../../services/orderAPI";
import { TextField } from "formik-mui";
import TelegramIcon from "@mui/icons-material/Telegram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

const initialValues = {
  name: "",
  phone: "",
  email: "",
  comment: "",
  communicateBy: ["email"],
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[\p{L}\s]+$/u, "*Введіть дійсне ім'я!")
    .min(2, "*Ваше ім'я занадто коротке!")
    .max(40, "*Ваше ім'я занадто довге!")
    .required("*Введіть ваше ім'я!"),
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, "*Введіть дійсний номер телефону починаючи з +380")
    .required("*Введіть номер телефону!"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "*Введіть дійсну електронну пошту"
    )
    .email("*Введіть дійсну електронну пошту!")
    .required("*Введіть електронну пошту!"),
  comment: Yup.string(),
  communicateBy: Yup.array()
    .min(1, "*Виберіть хоча б один метод спілкування!")
    .of(
      Yup.string().oneOf(
        ["email", "viber", "telegram"],
        "Недійсний метод спілкування"
      )
    ),
});

const OrderForm = () => {
  const handleSubmit = async (values, { resetForm }) => {
      try {
        const data = { ...values, communicateBy: [...values.communicateBy] };
      await addOrder(data);
      toast.success("Ваші дані були успішно надіслані!");
      resetForm();
    } catch (error) {
      toast.error(`Сталась помилка. ${error.response.data.message}`);
    }
  };

  return (
    <>
      <div>
        <p>Зв’язатися з нами</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <Field
                component={TextField}
                name="name"
                label="Ваше ім’я"
                variant="outlined"
                fullWidth
              />
            </div>
            <div>
              <Field
                component={TextField}
                name="phone"
                label="Номер телефону"
                variant="outlined"
                fullWidth
              />
            </div>
            <div>
              <Field
                component={TextField}
                name="email"
                label="Електронна пошта"
                variant="outlined"
                fullWidth
              />
            </div>
            <div>
              <Field
                component={TextField}
                name="comment"
                label="Коментар"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
              />
            </div>
            <p>
              Ви можете зв'язатися з нами за допомогою електронної пошти,
              Telegram або зателефонувати.
            </p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                icon={<MailOutlineIcon />}
                checkedIcon={<MailOutlineIcon />}
                name="communicateBy"
                value="email"
                              defaultChecked
                              multiple
              />
              
              <Checkbox
                icon={<PhoneInTalkIcon />}
                checkedIcon={<PhoneInTalkIcon />}
                name="communicateBy"
                              value="viber"
                              multiple
              />

              <Checkbox
                icon={<TelegramIcon />}
                checkedIcon={<TelegramIcon />}
                name="communicateBy"
                              value="telegram"
                              multiple
              />
            </div>
            <Button variant="contained" color="primary" type="submit">
              Надіслати
            </Button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default OrderForm;
