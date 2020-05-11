import React from 'react';
import { Button } from '@material-ui/core'

const LoadMoreButton = ({ text, callback}) => (
    <Button variant="contained" color="primary" size='large' onClick={callback} style={{display: 'block', margin: '20px auto'}}>
        {text}
    </Button>
)


export default LoadMoreButton;