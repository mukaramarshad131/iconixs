// import { Input } from "antd"; // Assuming you're using Ant Design for Input


const UploadDocs = ({onHandleChange, title }: { onHandleChange:(value:string)=>void, title: string }) => {

      const handleChange = (e: any) => {
        const file = e.target.files[0]; // Get the selected file
        if (!file) return; // Ensure a file is selected
    
        const reader = new FileReader(); // Create a new FileReader instance
    
        // Set the onload event handler to capture the Base64 result
        reader.onloadend = () => {
          const base64String = reader.result as string; // Convert the result to string (Base64)
          onHandleChange(base64String); // Set the Base64 string in state using setValue
          console.log("Base64 String:", base64String); // Optional: log the Base64 string
        };
    
        // Start reading the file as a data URL (Base64)
        reader.readAsDataURL(file);
      };

  return (
    <input
      type="file"
      accept="image/png, image/jpeg, .pdf"
      onChange={handleChange}
      placeholder={title}
    />
  );
};

export default UploadDocs;
