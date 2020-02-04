import React, { useContext } from 'react'
import { RouteComponentProps, Redirect, navigate } from '@reach/router'
import styled from 'styled-components'
import { useFormik } from 'formik'
import { Input, Button, tokens, utils } from '@frebliklo/ls-ds'

import { AuthContext } from '../context'
import { createUser } from '../firebase/db'

import Container from '../components/Container'

const { SPACER, TYPOGRAPHY } = tokens
const { toRem } = utils

interface Props {}

const Heading = styled.h1`
  font-size: ${TYPOGRAPHY.size.h1};
  font-weight: ${TYPOGRAPHY.weight.bold};
  margin-bottom: ${toRem(SPACER[2])};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding-top: ${toRem(SPACER[4])};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;

  & > div {
    margin-bottom: ${SPACER[2]}px;
  }

  & > button {
    align-self: flex-end;
    margin-top: ${SPACER[1]}px;
  }
`

const ProfileComplete: React.FC<Props & RouteComponentProps> = () => {
  const { user, setProfileCompleted } = useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
      username: user?.displayName ? user.displayName.split(' ')[0] : '',
      email: user?.email ? user.email : '',
      firstName: user?.displayName ? user.displayName.split(' ')[0] : '',
      lastName: '',
    },
    onSubmit: async (values, actions) => {
      console.log(values)
      actions.setSubmitting(true)

      if (user) {
        await createUser({
          uid: user.uid,
          username: values.username,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        })
      }

      try {
        setProfileCompleted(true)
        actions.setSubmitting(false)
        navigate('/')
      } catch (error) {
        console.log(error)
        actions.setSubmitting(false)
      }
    },
  })

  if (!user) {
    return <Redirect to="/" />
  }

  return (
    <Container>
      <Content>
        <Heading>Complete your profile</Heading>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            id="username"
            name="username"
            label="Username"
            placeholer="Pick a username"
            type="text"
            value={formik.values.username}
            error={formik.errors.username}
            onChange={formik.handleChange}
          />
          <Input
            id="firstName"
            name="firstName"
            label="First name"
            type="text"
            value={formik.values.firstName}
            error={formik.errors.firstName}
            onChange={formik.handleChange}
          />
          <Input
            id="lastName"
            name="lastName"
            label="Last name"
            type="text"
            value={formik.values.lastName}
            error={formik.errors.lastName}
            onChange={formik.handleChange}
          />
          <Input
            id="email"
            name="email"
            label="email"
            type="email"
            value={formik.values.email}
            error={formik.errors.email}
            onChange={formik.handleChange}
          />
          <Button type="submit" isLoading={formik.isSubmitting}>
            Submit
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

export default ProfileComplete
