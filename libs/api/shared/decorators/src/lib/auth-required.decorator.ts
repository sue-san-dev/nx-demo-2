import { SetMetadata } from '@nestjs/common';

export const IS_AUTH_REQUIRED_KEY = 'isAuthRequired';

/**
 * このデコレータを付与したrouteは認証が必須となる。
 * 未認証の場合は例外が投げられる。
 * @returns 
 */
export const AuthRequired = () => SetMetadata(IS_AUTH_REQUIRED_KEY, true);
