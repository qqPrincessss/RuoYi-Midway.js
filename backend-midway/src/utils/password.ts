import * as bcrypt from 'bcryptjs';

/**
 * @desc 根据密码明文生成hash密码
 * @param {*} password<string> 密码明文
 * @param {*} saltRounds<number> 密码盐值，默认为5
 * */
export function genHashPsw(password: string, saltRounds: any = 5) {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}

/**
 * @desc 验证密码是否正确，明文与hash值对比
 * @param {*} password<string> 密码明文
 * @param {*} hash<string> 密码hash值
 * */
export function isEqualPsw(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
