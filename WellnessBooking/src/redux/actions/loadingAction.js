export const SHOW_LOADING = 'SHOW_LOADING';

export function showLoading(isShow) {
    return {
        type: SHOW_LOADING,
        isShow
    }
}