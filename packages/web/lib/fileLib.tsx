export const readFile = async (
  File: File
): Promise<{ type: string; data: string; name: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (!reader.result || typeof reader.result !== 'string') {
        throw new Error('Error while reading file')
      }

      const dataFile = reader.result!.split(',')
      const file = {
        type: dataFile[0],
        data: dataFile[1],
        name: File.name,
      }
      resolve(file)
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsDataURL(File)
  })
}
