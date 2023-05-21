interface IRegisterLayoutProps {
  children?: React.ReactNode
}

const RegisterLayout = ({ children }: IRegisterLayoutProps) => {
  return (
    <>
      <div>
        RegisterLayout
        {children}
      </div>
    </>
  )
}

export default RegisterLayout
