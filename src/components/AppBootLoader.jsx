import Loader from './Loader'

function AppBootLoader() {
  return (
    <main className="boot-screen" role="status" aria-live="polite">
      <div className="boot-glass">
        <Loader size={54} color="#ffd24d" />
        <p>Loading Velora Web...</p>
      </div>
    </main>
  )
}

export default AppBootLoader
