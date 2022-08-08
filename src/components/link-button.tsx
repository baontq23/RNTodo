import React, { useCallback } from 'react'
import * as Linking from 'expo-linking'
import { Button, IButtonProps } from 'native-base'

interface Props extends IButtonProps {
  href: string
  href2?: string
}

const LinkButton = ({ href, href2, ...props }: Props) => {
  const handlePress = useCallback(async () => {
    await Linking.openURL(href).catch(() => {
      Linking.openURL(href2 === undefined ? href : href2);
    })
  }, [href, href2])

  return <Button {...props} onPress={handlePress} />
}

export default LinkButton
