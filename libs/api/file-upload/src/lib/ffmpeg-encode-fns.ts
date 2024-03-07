export const get720Commands = (): string[] => {
  return [
    '-map',
    '0:v:0',
    '-b:v:0',
    '1500k',
    '-s:v:0',
    '1280x720',
    '-c:v:0',
    'libx264',
    '-map',
    '0:a:0',
    '-c:a:0',
    'aac',
  ]
}