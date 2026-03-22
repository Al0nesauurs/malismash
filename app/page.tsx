import RoachGame from "./RoachGame";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/bg.png')",
      }}>
      <RoachGame />
      <RoachGame />
      <RoachGame />
      <RoachGame />
      <RoachGame />
    </div>
  );
}
