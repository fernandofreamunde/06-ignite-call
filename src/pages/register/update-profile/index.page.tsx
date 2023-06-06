import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, Header } from '../styles'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { FormAnnotation, ProfileBox } from './styles'
import { ArrowRight } from 'phosphor-react'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { GetServerSideProps } from 'next'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

const updateProfileSchema = z.object({
  bio: z.string(),
})

type UpdateProfileData = z.input<typeof updateProfileSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const session = useSession()
  const router = useRouter()

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })

    await router.push(`/schedule/${session.data?.user?.username}`)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Welcome to Ingite Call!</Heading>
        <Text>
          We need some information to set up your profile! You can change it
          later.
        </Text>

        <MultiStep size={4} currentStep={4} />

        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text>Profile picture</Text>
            <Avatar
              src={session.data?.user?.avatar_url}
              referrerPolicy="no-referrer"
              alt={session.data?.user?.name}
            />
          </label>

          <label>
            <Text size="sm">About you</Text>
            <TextArea {...register('bio')} />
            <FormAnnotation size="sm">
              Tell us a little about yourself. This will be shown to your
              profile page.
            </FormAnnotation>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Finish
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Header>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
