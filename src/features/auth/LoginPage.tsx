import { Alert, Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router'
import { useAuth } from '@/stores/auth'
import { errorMessage } from '@/utils'
import { useLogin, type LoginInput } from './api'

export function LoginPage() {
  const token = useAuth((state) => state.token)
  const login = useLogin()
  const { handleSubmit, register } = useForm<LoginInput>({
    defaultValues: {
      password: '',
      username: '',
    },
  })

  if (token) {
    return <Navigate to="/" replace />
  }

  function onSubmit(values: LoginInput) {
    login.mutate(values)
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: 380 }}>
        <Card.Body className="p-4">
          <h1 className="h4 mb-4 text-center">Masuk ke Asisten WMS</h1>
          {login.isError && <Alert variant="danger">{errorMessage(login.error)}</Alert>}
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoComplete="username"
                autoFocus
                {...register('username', { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                autoComplete="current-password"
                type="password"
                {...register('password', { required: true })}
              />
            </Form.Group>
            <Button
              className="w-100"
              disabled={login.isPending}
              type="submit"
            >
              {login.isPending ? 'Memproses...' : 'Masuk'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
