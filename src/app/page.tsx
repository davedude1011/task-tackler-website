"use client";

export default function App() {
  async function handle_image_input(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = reader.result as string;

      try {
        const res = await fetch("http://localhost:3000/api/upload_image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            base64_image: base64String,
          }),
        });
        
        const data = await res.json();
        console.log("API response:", data);
      } catch (error) {
        console.error("Error calling API:", error);
      }
    };

    reader.readAsDataURL(file);
  }

  return (
    <div>
      <h1>Upload an Image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handle_image_input}
      />
    </div>
  );
}
