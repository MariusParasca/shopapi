const mapCustomer = (data) => ({
  email: data.email,
  name: data.name,
  balance: data.balance,
  id: data._id,
});

module.exports = { mapCustomer };
