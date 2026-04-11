import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../Components/TextInput";
import SelectInput from "../Components/SelectInput";
import PrimaryButton from "../Components/PrimaryButton";
import PageCard from "../Components/PageCard";
import API_BASE_URL from "../config/api";
function BoxPronami() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    depositor: "",
    amount: "",
    familyCode:"", //added family code 
    collectionType: "Individual",
    date: "",
  });
  const[erros,setErrors]=useState({});

  function validate(){
    const newErrors={}

    if(!form.depositor.trim()){
      newErrors.depositor="Please Enter your Name "
    }
    if(!form.amount||Number(form.amount)<0){
      newErrors.amount="Please Enter a valid amount"
    }
    if(!form.date){
      newErrors.date="date is not filled";
    }
    //family code validation
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
    setForm({ ...form, [e.target.name]: e.target.value });
  }

async function handleSubmit(e) {
  e.preventDefault();

  const errorValidation = validate();
  setErrors(errorValidation);

  // ✅ STOP if there are errors
  if (Object.keys(errorValidation).length > 0) {
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/pronami/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Pronami entry saved successfully");
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
    <PageCard title="Box Pronami">
      <form onSubmit={handleSubmit}>
        <TextInput
          name="depositor"
          value={form.depositor}
          onChange={handleChange}
          placeholder="Depositor Name"
          error={erros.depositor}
        />

        <TextInput
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount (₹)"
          error={erros.amount}
        />
        <TextInput
        type="text"
        name="familyCode"
         placeholder="Family Code (12 digits)"
  value={form.familyCode}
  onChange={handleChange}
  maxLength={12}
  error={erros.familyCode}
        />
        <SelectInput
          name="collectionType"
          value={form.collectionType}
          onChange={handleChange}
          options={[
            { label: "Individual", value: "Individual" },
            { label: "Box Collection", value: "Box" },
          ]}
        />

        <TextInput
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          error={erros.date}
        />

        <PrimaryButton>Submit Pronami Entry</PrimaryButton>
      </form>
    </PageCard>
  );
}

export default BoxPronami;
