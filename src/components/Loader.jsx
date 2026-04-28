import { ClockLoader } from 'react-spinners'

function Loader({ size = 18, color = '#ffffff' }) {
  return (
    <span className="inline-loader" aria-hidden="true">
      <ClockLoader color={color} size={size} speedMultiplier={1.15} />
    </span>
  )
}

export default Loader
