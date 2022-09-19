import React, {useState} from 'react'
import {cn} from "../utils/utils";

import '../styles/SampleSplitter.css';

const SampleSplitter = ({
                            id = 'drag-bar',
                            dir,
                            isDragging,
                            ...props
                        }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div
            id={id}
            data-testid={id}
            tabIndex={0}
            className={cn(
                'sample-drag-bar',
                dir === 'horizontal' && 'sample-drag-bar--horizontal',
                (isDragging || isFocused) && 'sample-drag-bar--dragging'
            )}
            onFocus={() => setIsFocused(true)}
            onTouchStart={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onTouchEnd={() => setIsFocused(false)}
            {...props}
        />
    )
};

export default SampleSplitter
