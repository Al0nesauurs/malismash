import RoachGame from "./RoachGame"
import RoachGameContainer from "./RoachGameContainer"

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/bg.png')",
        overflow: 'hidden',
      }}>
      <RoachGameContainer />
    </div>
  )
}
