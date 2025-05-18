import { selectInfoPlanning } from '@/app/planning/core/infrastructure/redux'
import { copyLink } from '@/app/plannings/core/infrastructure/utils'
import { ROUTER } from '@/infrastructure/constants'
import { useAppSelector } from '@/infrastructure/hooks/store'
import useAlert from '@/infrastructure/hooks/useAlert'
import { Button, Divider, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { QRCodeCanvas } from 'qrcode.react'
import React, { useRef } from 'react'
import { LuUserPlus2 } from 'react-icons/lu'
import { MdOutlineContentCopy, MdOutlineFileDownload } from 'react-icons/md'

const Invite = () => {
	const { alertSuccess } = useAlert();
	// TODO: Crear interfaces
	const info: any = useAppSelector(selectInfoPlanning);

	const qrRef = useRef<any | null>(null);

	const downloadQRCode = (e: any) => {
		e.preventDefault();
		let canvas = qrRef.current.querySelector("canvas");
		let image = canvas.toDataURL("image/png");
		let anchor = document.createElement("a");
		anchor.href = image;
		anchor.download = `qr-code-invite.png`;
		document.body.appendChild(anchor);
		anchor.click();
		document.body.removeChild(anchor);
	};

	return (
		<>
			<Popover placement="bottom" backdrop='blur' offset={20} showArrow className=''>
				<PopoverTrigger>
					<Button size="sm" color='primary' className='bg-white text-sm dark:bg-default dark:text-white' variant='flat' startContent={<LuUserPlus2 className="text-lg dark:text-white" />}>Invitar</Button>
				</PopoverTrigger>
				<PopoverContent>
					<div className=" flex flex-col px-1 py-2">
						<h2 className='font-bold text-sm'>Invita a tu equipo</h2>
						<p className='text-xs text-secondary-400 dark:text-white/80'>¡Comparte este enlace o código QR con tu equipo para comenzar!</p>
						<Divider orientation='horizontal' className='my-2' />

						<div className='flex flex-row items-center space-x-4 mt-4 '>
							<div className='flex flex-col space-y-3'>
								<Button size="sm" color='primary' onClick={() => copyLink(`${process.env.NEXT_PUBLIC_URL_FRONT}/${ROUTER.planningLiveUrl}/${info.planningId}`).then(() => alertSuccess('ID copiado con éxito.'))} variant='solid' startContent={<MdOutlineContentCopy />}>COPIAR URL </Button>
								<Button size="sm" color='primary' onClick={downloadQRCode} variant='bordered' startContent={<MdOutlineFileDownload />}>DESCARGAR CÓDIGO QR</Button>
							</div>
							<div ref={qrRef} className='p-2 border-solid border-1 border-secondary-200 rounded-lg flex items-center justify-center'>
								<QRCodeCanvas id="qrCode" size={60} value={`${process.env.NEXT_PUBLIC_URL_FRONT}/${ROUTER.planningLiveUrl}/${info.planningId}`} />,
							</div>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</>
	)
}

export default Invite
