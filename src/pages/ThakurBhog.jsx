import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../Components/TextInput";
import SelectInput from "../Components/SelectInput";
import PrimaryButton from "../Components/PrimaryButton";
import PageCard from "../Components/PageCard";
import API_BASE_URL from "../config/api";
function ThakurBhog() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    depositor: "",
    amount: "",
    familyCode:"",//added family code
    bhogType: "Purna",
    date: "",
  });

  const [errors,setErrors]=useState({});
 //we are making validation function
  function validate(){
  const newErrors={};
 if(!form.depositor.trim()){  //removed whitespaced leading and trailing and returns a new string    
  newErrors.depositor="You have not entered the  Depositor Name"
 }
 if(!form.amount || Number(form.amount)<=0){
  newErrors.amount="Enter a valid amount ";
 }
 if (!form.date) {
    newErrors.date = "Date is required";
  }
  //  Family Code Validation
  if (!form.familyCode) {
    newErrors.familyCode = "Family Code is required";
  } else if (!/^\d{12}$/.test(form.familyCode)) {
    newErrors.familyCode = "Family Code must be exactly 12 digits";
  }
  return newErrors;
}
  function handleChange(e) {
    const { name, value } = e.target;

  // Allow only digits for familyCode
  if (name === "familyCode") {
    if (!/^\d*$/.test(value)) return;
  }
    setForm({ ...form, [name]: value });
  }

 async function handleSubmit(e) {
    e.preventDefault();
    const errorValidation=validate();
    setErrors(errorValidation);
    if(Object.keys(errorValidation).length>0){
      return;
    }
      try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/bhog/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Bhog entry saved successfully");
      navigate("/dashboard");
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
    
  }

  return (
    <PageCard title="Thakur Bhog ">
      <form onSubmit={handleSubmit}>
        <TextInput
          name="depositor"
          value={form.depositor}
          onChange={handleChange}
          placeholder="Depositor Name"
          error={errors.depositor}
        />

        <TextInput
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount (₹)"
          error={errors.amount}
        />
        <TextInput
        type="text"
        name="familyCode"
        placeholder="family code (12 digits exactly)"
        value={form.familyCode}
        maxLength={12}
        onChange={handleChange}
        error={errors.familyCode}/>

        <SelectInput
          name="bhogType"
          value={form.bhogType}
          onChange={handleChange}
          options={[
            { label: "Purna Bhog", value: "Purna" },
            { label: "Partial Bhog", value: "Partial" },
          ]}
        />

        <TextInput
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          error={errors.date}
        />

        <PrimaryButton>Submit Bhog Entry</PrimaryButton>
      </form>
    </PageCard>
  );
}

export default ThakurBhog;
