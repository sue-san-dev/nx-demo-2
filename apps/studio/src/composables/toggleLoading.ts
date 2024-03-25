import { readonly } from 'vue';
import { useState } from 'nuxt/app';

export const useToggleLoading = () => {
  const showLoading = useState<boolean>('toggleLoading', () => false)
  const toggleLoading = (_showLoading: boolean) => { showLoading.value = _showLoading }
  return {
    showLoading: readonly(showLoading),
    toggleLoading,
  }
}