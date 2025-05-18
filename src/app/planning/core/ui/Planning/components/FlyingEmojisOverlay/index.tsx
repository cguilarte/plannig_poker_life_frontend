import { SUSCRIPTION_EMOJI_FLY } from '@/app/planning/core/infrastructure/graphql';
import { EMOJI_MAP } from '@/app/planning/core/infrastructure/utils';
import { useSubscription } from '@apollo/client';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef } from 'react'

const FlyingEmojisOverlay = () => {
	const overlayRef: any = useRef(null);
	const param = useParams()


	const handleRemoveFlyingEmoji = useCallback((node: any) => {
		if (overlayRef.current) return;
		overlayRef.current.removeChild(node);
	}, []);

	const handleDisplayFlyingEmoji = useCallback(
		(emoji: string, name: string) => {
			if (!overlayRef.current) {
				return;
			}

			const node: any = document.createElement('div');
			node.innerHTML = `<div class="emojiContent">${emoji} <span>${name}</span></div>`;
			node.className =
				Math.random() * 1 > 0.5 ? 'emoji wiggle-1' : 'emoji wiggle-2';
			//node.style.transform = `rotate(${-30 + Math.random() * 60}deg)`;
			node.style.left = `${Math.random() * 10}%`;
			node.src = '';
			overlayRef.current.appendChild(node);

			node.addEventListener('animationend', (e: any) =>
				handleRemoveFlyingEmoji(e.target)
			);
		},
		[handleRemoveFlyingEmoji]
	);

	useSubscription(SUSCRIPTION_EMOJI_FLY, {
		variables: { planningId: param.planningId },
		onData: ({ data }: any) => {
			if (data.data) {
				const { emoji, name } = data.data.emojiFly;
				handleDisplayFlyingEmoji(emoji, name)
			}
		}
	});

	// Remove all event listeners on unmount to prevent console warnings
	useEffect(
		() => () =>
			overlayRef.current?.childNodes.forEach((n: any) =>
				n.removeEventListener('animationend', handleRemoveFlyingEmoji)
			),
		[handleRemoveFlyingEmoji]
	);

	return (
		<div className="flying-emojis" ref={overlayRef}>
			<style jsx>{`
				.flying-emojis :global(.emojiContent) {
					display:flex;
					flex-direction: column;
					align-items: center;
    			justify-content: center;
				}
				.flying-emojis :global(.emojiContent span) {
					font-size:12px;
					font-weight:bold;
					width:max-content;
					display:block;
					text-aling:center;
					padding:4px;
					border-radius: 8px;
					background-color:#393D40;
					color:#fff;
				}
        .flying-emojis {
          position: fixed;
          top: 0px;
          bottom: 0px;
          left: 0px;
          right: 0px;
          overflow: hidden;
          pointer-events: none;
          user-select: none;
          z-index: 99;
        }

        .flying-emojis :global(.emoji) {
          position: absolute;
          bottom: 0px;
          left: 100%;
          font-size: 48px;
          line-height: 1;
          width: 48px;
          height: 48px;
        }

        .flying-emojis :global(.emoji.wiggle-1) {
          animation: emerge 8s forwards,
            wiggle-1 1s ease-in-out infinite alternate;
        }

        .flying-emojis :global(.emoji.wiggle-2) {
          animation: emerge 8s forwards,
            wiggle-2 1s ease-in-out infinite alternate;
        }

        @keyframes emerge {
          to {
            bottom: 85%;
            opacity: 0;
          }
        }

        @keyframes wiggle-1 {
          from {
            margin-left: -10px;
          }
          to {
            margin-left: 10px;
          }
        }

        @keyframes wiggle-2 {
          from {
            margin-left: 10px;
          }
          to {
            margin-left: -10px;
          }
        }
      `}</style>

		</div>
	)
}

export default FlyingEmojisOverlay
