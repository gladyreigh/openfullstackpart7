# Project Update Summary

## Overview

We refactored the React application to utilize custom hooks for managing form inputs and API resources. This improves code reusability and organization.

## Updated Files

### 1. `useField.js`

**Path:** `/src/hooks/useField.js`

This custom hook manages the state of form inputs. It provides functionality for handling input changes and resetting the input field.

```javascript
import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export default useField
