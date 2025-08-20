import { MenuItem, Select } from "@mui/material";
export default function QuantitySelect({ value, onChange, min=1, max=10 }) {
  return (
    <Select size="small" value={value} onChange={(e)=>onChange(Number(e.target.value))}>
      {Array.from({length: max-min+1}, (_,i)=>i+min).map(n=>(
        <MenuItem key={n} value={n}>{n}</MenuItem>
      ))}
    </Select>
  );
}
