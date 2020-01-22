import React, { useContext } from 'react'
import { RouteComponentProps, Redirect } from '@reach/router'
import { useFormik } from 'formik'

import { AuthContext } from '../context'

interface Props {}

const ProfileComplete: React.FC<Props & RouteComponentProps> = () => {
  const { user } = useContext(AuthContext)
  const formik = useFormik({
    initialValues: {
      email: user?.email ? user.email : '',
      firstName: user?.displayName ? user.displayName.split(' ')[0] : '',
      lastName: '',
    },
    onSubmit: values => {
      console.log(values)
    },
  })

  if (!user) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h1>Complete your profile</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          readOnly
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ProfileComplete
