const regionOptions = {
  types: ["(regions)"],
  componentRestrictions: { country: "ua" },
  fields: ["formatted_address", "geometry", "name"],
};

const cityOptions = {
  types: ["(cities)"],
  componentRestrictions: { country: "ua" },
  fields: ["formatted_address", "geometry", "name"],
};

const streetOptions = {
  types: ["address"],
  componentRestrictions: { country: "ua" },
  fields: ["formatted_address", "geometry", "name"],
};

const options = {
  region: regionOptions,
  city: cityOptions,
  street: streetOptions,
};

export default options;

// await updateDoc(doc(db, "users", userId, "addresses"), {
//   addresses: {
//     // index: newIndex,

//     ...newAddress,
//     region: state.region,
//     city: state.city,
//     street: state.street,
//   },
// });

// await updateDoc(doc(db, "users", userId, "addresses"), {
//   newIndex: {
//     ...addresses,
//     region: state.region,
//     city: state.city,
//     street: state.street,
//   },
// });
