import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { Container, Header } from '../styles'
import {
  FormError,
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from './styles'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { getWeekDays } from '@/utils/get-week-days'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { convertTimeStringToMinutes } from '@/utils/convert-time-string-to-minutes'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        start: z.string(),
        end: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'You must select at least one time interval',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.start),
          endTimeInMinutes: convertTimeStringToMinutes(interval.end),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message: 'The end time must be at least 1 hour after the start time',
      },
    ),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: true, start: '08:00', end: '18:00' },
        { weekDay: 1, enabled: true, start: '08:00', end: '18:00' },
        { weekDay: 2, enabled: true, start: '08:00', end: '18:00' },
        { weekDay: 3, enabled: true, start: '08:00', end: '18:00' },
        { weekDay: 4, enabled: true, start: '08:00', end: '18:00' },
        { weekDay: 5, enabled: false, start: '08:00', end: '18:00' },
        { weekDay: 6, enabled: false, start: '08:00', end: '18:00' },
      ],
    },
  })

  const router = useRouter()

  const weekdays = getWeekDays()

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const intervals = watch('intervals')

  async function handleSetTimeIntervals(data: any) {
    const { intervals } = data as TimeIntervalsFormOutput

    await api.post('/users/time-intervals', { intervals })

    await router.push('/register/update-profile')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Almost there!</Heading>
        <Text>
          Define the time intervals you want to be available for meetings.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalContainer>
          {fields.map((field, index) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true)
                          }}
                          checked={field.value}
                        />
                      )
                    }}
                  />
                  <Text>
                    {weekdays[field.weekDay]} {`(${field.weekDay})`}
                  </Text>
                </IntervalDay>

                <IntervalInputs>
                  <TextInput
                    size={'sm'}
                    type="time"
                    step={60}
                    disabled={!intervals[index].enabled}
                    {...register(`intervals.${index}.start`)}
                  />
                  <TextInput
                    size={'sm'}
                    type="time"
                    step={60}
                    disabled={!intervals[index].enabled}
                    {...register(`intervals.${index}.end`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            )
          })}
        </IntervalContainer>

        {errors.intervals && (
          <FormError size="sm">{errors.intervals.message}</FormError>
        )}

        <Button type="submit" disabled={isSubmitting}>
          Next Step <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
