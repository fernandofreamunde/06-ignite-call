import { Calendar } from '@/components/Calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'
import { useState } from 'react'
import dayjs from 'dayjs'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isDateSelected = !!selectedDate

  const dateWeekDay = isDateSelected ? dayjs(selectedDate).format('dddd') : ''

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {dateWeekDay}{' '}
            <span>{dayjs(selectedDate).format('MMMM D, YYYY')}</span>
          </TimePickerHeader>

          <TimePickerList>
            <TimePickerItem>8:00</TimePickerItem>
            <TimePickerItem>9:00</TimePickerItem>
            <TimePickerItem>10:00</TimePickerItem>
            <TimePickerItem>11:00</TimePickerItem>
            <TimePickerItem>12:00</TimePickerItem>
            <TimePickerItem>13:00</TimePickerItem>
            <TimePickerItem>14:00</TimePickerItem>
            <TimePickerItem>15:00</TimePickerItem>
            <TimePickerItem>16:00</TimePickerItem>
            <TimePickerItem>17:00</TimePickerItem>
            <TimePickerItem>18:00</TimePickerItem>
            <TimePickerItem>19:00</TimePickerItem>
            <TimePickerItem>20:00</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
