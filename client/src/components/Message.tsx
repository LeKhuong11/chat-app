import moment from 'moment';
import React from 'react'

type Messagetype = {
    sentBy: string,
    content: string,
    avatar?: string,
    createdAt: string
}

function Message({ sentBy, content, avatar, createdAt }: Messagetype) {
    return (
            <>
                {
                sentBy === 'me' ? 
                    <div title={moment(createdAt).format('HH:mm')} className="message w-9/12 flex justify-end self-end my-2 mx-3">
                        <div>
                            <div className="texts bg-sky-500 rounded-md rounded-ee-none p-2">
                            <p className='text-white'>{content}</p>
                            </div>
                            <p className='text-white text-xs text-end'>{moment(createdAt).format('DD/MM/YYYY')}</p>
                        </div>
                    </div> :
                    <div title={moment(createdAt).format('HH:mm')} className="message w-9/12 flex items-start my-2">
                        <img src={avatar} alt="Avaatar" className='rounded-full w-9 mr-2' />
                        <div>
                            <div className="texts bg-custom-bg p-2 rounded-ss-none rounded-md">
                            <p className='text-white'>{content}</p>
                            </div>
                            <p className='text-white text-xs'>{moment(createdAt).format('DD/MM/YYYY')}</p>
                        </div>
                    </div>
            }
            </>
        
    );
}

export default Message
