import nFormatter from '@/Helpers/numbers'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { CaretUpOutline, CaretDownOutline } from 'react-ionicons'
import LoadingIndicator from '../LoadingIndicator'

const ViewsActionBtn = ({
    votes,
    isQuestion,
    question_id,
    answer_id,
    setToastItems,
    selectedAnswer,
    setSelectedAnswer,
}) => {
    const [isSelectedAnswer, setIsSelectedAnswer] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [voteCount, setVoteCount] = useState(votes)

    useEffect(() => {
        setIsSelectedAnswer(selectedAnswer == answer_id)
    }, [selectedAnswer])

    // set-correct-answer
    const setCorectAnswer = async () => {
        if (processing) return

        if (selectedAnswer === answer_id) return

        setIsSelectedAnswer(true)
        setProcessing(true)

        await axios
            .post(process.env.NEXT_PUBLIC_API_BASE_URL + 'set-correct-answer', {
                method: 'POST',
                body: {
                    question_id: question_id,
                    answer_id: answer_id,
                },
            })
            .then(() => setSelectedAnswer(answer_id))
            .catch(function (error) {
                setToastItems(prevState => [
                    ...prevState,
                    {
                        message: error?.response?.data?.message,
                        status: 'danger',
                    },
                ])
            })

        setProcessing(false)
    }

    // update vote count
    const updateVote = async action => {
        if (processing) return

        setProcessing(true)

        let formData = {}

        if (isQuestion) {
            formData = { question_id: question_id, action: action }
        } else {
            formData = { answer_id: answer_id, action: action }
        }

        await axios
            .post(process.env.NEXT_PUBLIC_API_BASE_URL + 'update-vote', {
                method: 'POST',
                body: formData,
            })
            .then(res => {
                setVoteCount(res.data)
            })
            .catch(function (error) {
                setToastItems(prevState => [
                    ...prevState,
                    {
                        message: error.response.data.message,
                        status: 'danger',
                    },
                ])
            })

        setProcessing(false)
    }

    return (
        <>
            {processing && <LoadingIndicator loadingState={true} />}
            <div className="stats flex w-[50px] flex-col items-center">
                <button type="button" onClick={() => updateVote('INCREMENT')}>
                    <CaretUpOutline
                        color={'#d1d5db'}
                        height="40px"
                        width="40px"
                    />
                </button>

                <span className="text-[20px] text-gray-500">
                    {nFormatter(voteCount)}
                </span>

                <button type="button" onClick={() => updateVote('DECREMENT')}>
                    <CaretDownOutline
                        color={'#d1d5db'}
                        height="40px"
                        width="40px"
                        onClick={() => {}}
                    />
                </button>

                {!isQuestion && (
                    <button
                        type="button"
                        className="h-[40px] text-[40px] leading-none "
                        title="Mark answer as selected"
                        onClick={setCorectAnswer}>
                        <svg
                            width="32"
                            height="23"
                            viewBox="0 0 32 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${
                                isSelectedAnswer
                                    ? 'fill-green-700'
                                    : 'fill-gray-300'
                            } hover:fill-green-700`}>
                            <path d="M31.0627 5.40005L14.1814 22.0737C12.9313 23.3088 10.9034 23.3088 9.65217 22.0737L0.937917 13.4654C-0.312639 12.2304 -0.312639 10.2271 0.937917 8.99189C2.18871 7.75639 4.21638 7.75639 5.46662 8.99142L11.9174 15.3634L26.5333 0.92627C27.784 -0.309225 29.8119 -0.308289 31.0622 0.92627C32.3125 2.16153 32.3125 4.16409 31.0627 5.40005Z" />
                        </svg>
                    </button>
                )}
            </div>
        </>
    )
}

export default ViewsActionBtn
