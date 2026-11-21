import { expect, test } from '@playwright/test'
import { openAgent } from './helpers'

test('Remote Control liga pelo botão, mostra o link e desliga com /rc off', async () => {
  const { app, page } = await openAgent()
  const button = page.getByTestId('remote-control')
  await expect(button).toHaveAttribute('data-status', 'off')

  await button.click()
  await expect(button).toHaveAttribute('data-status', 'connected')
  await expect(page.getByTestId('remote-control-link')).toHaveAttribute('href', 'https://claude.ai/code/session_fake')
  await expect(page.getByTestId('composer-notice')).toContainText('Remote Control ativo: https://claude.ai/code/session_fake')

  const input = page.getByRole('textbox', { name: 'Mensagem para o Claude' })
  await input.fill('/rc off')
  await input.press('Enter')
  await expect(button).toHaveAttribute('data-status', 'off')
  await expect(page.getByTestId('remote-control-link')).toHaveCount(0)
  await app.close()
})
