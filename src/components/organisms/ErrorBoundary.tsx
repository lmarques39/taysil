import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <p className="text-5xl font-bold text-slate-200 mb-4">!</p>
          <h1 className="text-xl font-semibold text-slate-800 mb-2">Algo correu mal</h1>
          <p className="text-slate-500 mb-6">Por favor recarregue a página.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Recarregar
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
