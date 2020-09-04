import React from 'react';
import { useAuthState } from '../../context/auth';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';
import classNames from 'classnames'

export default function Message ({message}) {
    const { user } = useAuthState();
    const sent = message.from === user.username
    const received = !sent;
    return (
        <div className="d-flex my-3">
            <OverlayTrigger transition={false} placement={sent ? 'right' : 'left'} overlay={
                <Tooltip>
                    {moment(message.createdAt).format('MMMM DD, YYYY @ h:mm a')}
                </Tooltip>
                }>
                <div className={classNames('py-2 px-3 rounded-pill', {
                    'bg-primary':sent,
                    "bg-secondary": received,
                })}>
                    <p className={classNames({'text-white': sent})} key={message.uuid}>
                        {message.content}
                    </p>
                </div>
            </OverlayTrigger>
        </div>
    )
}