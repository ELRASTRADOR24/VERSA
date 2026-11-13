import React from 'react';
import { useStudio } from '../context/StudioContext';
import type { BookingVariant, ServiceItem } from '../types/studio';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';

interface TariffCardsProps {
  onSelectServiceForBooking: (serviceId: string, variant: BookingVariant) => void;
}

export const TariffCards: React.FC<TariffCardsProps> = ({ onSelectServiceForBooking }) => {
  const { data } = useStudio();
  const activeServices = data.services.filter((s) => s.active);
  const showAllServiceImages = data.config.showServiceImages !== false;
  const shouldShowImage = (service: ServiceItem) =>
    showAllServiceImages && service.showImage !== false && Boolean(service.imageUrl);

  const extensions = activeServices.filter((s) => s.category === 'extensions');
  const deposes = activeServices.filter((s) => s.category === 'depose');
  const rehaussement = activeServices.filter((s) => s.category === 'rehaussement');
  const blanchiment = activeServices.filter((s) => s.category === 'blanchiment');

  const handleBookClick = (service: ServiceItem, variant: BookingVariant) => {
    onSelectServiceForBooking(service.id, variant);
    const target = document.getElementById('reservation');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="tarifs"
      aria-labelledby="tarifs-heading"
      className="surface-paper border-b border-stone/70 px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <img
            src="/logo-eyes-dark.png"
            alt=""
            width={659}
            height={226}
            loading="lazy"
            className="mx-auto mb-3 h-auto w-24 opacity-90 sm:w-28"
          />
          <p className="text-[11px] font-medium tracking-[0.24em] text-taupe uppercase">
            Carte des prestations
          </p>
          <h2 id="tarifs-heading" className="mt-2 font-serif text-3xl text-charcoal sm:text-5xl">
            {data.config.brandName}
          </h2>
          <p className="mt-2 text-xs tracking-wide text-taupe sm:text-sm">
            Sélectionnez directement une prestation pour pré-remplir votre demande de rendez-vous.
          </p>
        </div>

        {/* White editorial tariff sheet mirroring the Instagram story design */}
        <div className="border border-charcoal/15 bg-white px-5 py-8 shadow-[0_24px_60px_-30px_rgba(20,19,17,0.14)] sm:px-12 sm:py-12">
          {/* EXTENSIONS DE CILS */}
          <div>
            <div className="flex flex-wrap items-end justify-between gap-2 border-b border-charcoal/15 pb-3">
              <h3 className="editorial-underline font-serif text-2xl text-charcoal sm:text-3xl">
                Extensions de cils :
              </h3>
              <div className="text-right text-[11px] leading-tight text-taupe">
                <p className="font-medium text-charcoal">Remplissage 3 semaines</p>
                <p>Pas de remplissages successifs possibles</p>
              </div>
            </div>

            <div className="mt-3 hidden grid-cols-[1fr_auto_auto] gap-6 border-b border-stone/40 pb-2 text-[11px] font-medium tracking-widest text-taupe uppercase sm:grid">
              <span>Prestation</span>
              <span className="w-24 text-right">Pose complète</span>
              <span className="w-24 text-right">Remplissage</span>
            </div>

            <ul className="divide-y divide-stone/40">
              {extensions.map((service) => (
                <li key={service.id} className="py-4">
                  <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-6">
                    <div className="flex items-start gap-3.5 sm:items-center">
                      {shouldShowImage(service) && service.imageUrl ? (
                        <img
                          src={optimizeCloudinaryUrl(service.imageUrl, 180)}
                          alt={service.name}
                          width={64}
                          height={64}
                          className="h-14 w-14 shrink-0 border border-stone/70 bg-paper object-cover sm:h-16 sm:w-16"
                        />
                      ) : null}
                      <div>
                        <p className="font-serif text-xl text-charcoal sm:text-2xl">
                          {service.name}
                        </p>
                        <p className="mt-0.5 text-xs text-taupe">{service.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:contents">
                      <button
                        type="button"
                        onClick={() => handleBookClick(service, 'full')}
                        className="flex min-h-[44px] flex-1 items-center justify-between border border-stone/70 px-3 py-2 text-left transition-colors hover:border-charcoal hover:bg-ivory sm:w-24 sm:flex-none sm:justify-end sm:border-0 sm:px-2"
                        aria-label={`Réserver ${service.name} en pose complète à ${service.fullPrice} euros`}
                      >
                        <span className="text-[11px] text-taupe uppercase sm:hidden">Pose</span>
                        <span className="font-serif text-2xl text-charcoal">
                          {service.fullPrice}€
                        </span>
                      </button>

                      {service.refillPrice != null ? (
                        <button
                          type="button"
                          onClick={() => handleBookClick(service, 'refill')}
                          className="flex min-h-[44px] flex-1 items-center justify-between border border-stone/70 px-3 py-2 text-left transition-colors hover:border-charcoal hover:bg-ivory sm:w-24 sm:flex-none sm:justify-end sm:border-0 sm:px-2"
                          aria-label={`Réserver ${service.name} en remplissage 3 semaines à ${service.refillPrice} euros`}
                        >
                          <span className="text-[11px] text-taupe uppercase sm:hidden">
                            Rempl. 3 sem.
                          </span>
                          <span className="font-serif text-2xl text-charcoal">
                            {service.refillPrice}€
                          </span>
                        </button>
                      ) : (
                        <span className="hidden w-24 text-right text-xs text-taupe sm:inline-block">
                          —
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-3 border-l-2 border-charcoal/40 pl-3 text-xs text-taupe italic">
              Pose en cils marrons et cils pailletés / déco cils disponibles sur demande lors de la
              réservation.
            </p>
          </div>

          {/* DÉPOSES */}
          {deposes.length > 0 && (
            <div className="mt-9 border-t border-charcoal/15 pt-7">
              <ul className="space-y-3">
                {deposes.map((service) => (
                  <li
                    key={service.id}
                    className="flex items-center justify-between gap-4 border-b border-stone/30 pb-2.5"
                  >
                    <div className="flex items-center gap-3.5">
                      {shouldShowImage(service) && service.imageUrl ? (
                        <img
                          src={optimizeCloudinaryUrl(service.imageUrl, 160)}
                          alt={service.name}
                          width={56}
                          height={56}
                          className="h-12 w-12 shrink-0 border border-stone/70 bg-paper object-cover sm:h-14 sm:w-14"
                        />
                      ) : null}
                      <div>
                        <p className="font-serif text-xl text-charcoal">{service.name}</p>
                        <p className="text-xs text-taupe">{service.description}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleBookClick(service, 'standard')}
                      className="min-h-[44px] shrink-0 px-2 font-serif text-2xl text-charcoal underline-offset-4 hover:underline"
                    >
                      {service.fullPrice}€
                    </button>
                  </li>
                ))}
                <li className="flex items-center justify-between gap-4 pt-1">
                  <div>
                    <p className="font-serif text-xl text-charcoal">Dépose → repose</p>
                    <p className="text-xs text-taupe">
                      Option sélectionnable gratuitement lors de la réservation d’une nouvelle pose.
                    </p>
                  </div>
                  <span className="font-serif text-xl font-medium text-charcoal">Gratuit</span>
                </li>
              </ul>
            </div>
          )}

          {/* REHAUSSEMENT DE CILS */}
          {rehaussement.length > 0 && (
            <div className="mt-9 border-t border-charcoal/25 pt-7">
              <ul className="space-y-4">
                {rehaussement.map((service) => (
                  <li
                    key={service.id}
                    className="flex flex-col gap-3 sm:grid sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-6"
                  >
                    <div className="flex items-start gap-3.5 sm:items-center">
                      {shouldShowImage(service) && service.imageUrl ? (
                        <img
                          src={optimizeCloudinaryUrl(service.imageUrl, 180)}
                          alt={service.name}
                          width={64}
                          height={64}
                          className="h-14 w-14 shrink-0 border border-stone/70 bg-paper object-cover sm:h-16 sm:w-16"
                        />
                      ) : null}
                      <div>
                        <h3 className="editorial-underline font-serif text-2xl text-charcoal">
                          {service.name}
                        </h3>
                        <p className="mt-1 text-xs text-taupe">{service.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:contents">
                      <button
                        type="button"
                        onClick={() => handleBookClick(service, 'full')}
                        className="flex min-h-[44px] flex-1 items-center justify-between border border-stone/70 px-3 py-2 transition-colors hover:border-charcoal hover:bg-ivory sm:w-24 sm:flex-none sm:flex-col sm:items-end sm:border-0 sm:px-2"
                      >
                        <span className="text-[10px] tracking-wider text-taupe uppercase">
                          Seul
                        </span>
                        <span className="font-serif text-2xl text-charcoal">
                          {service.fullPrice}€
                        </span>
                      </button>

                      {service.refillPrice != null && (
                        <button
                          type="button"
                          onClick={() => handleBookClick(service, 'tint')}
                          className="flex min-h-[44px] flex-1 items-center justify-between border border-stone/70 px-3 py-2 transition-colors hover:border-charcoal hover:bg-ivory sm:w-28 sm:flex-none sm:flex-col sm:items-end sm:border-0 sm:px-2"
                        >
                          <span className="text-[10px] tracking-wider text-taupe uppercase">
                            Avec teinture
                          </span>
                          <span className="font-serif text-2xl text-charcoal">
                            {service.refillPrice}€
                          </span>
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* BLANCHIMENT DENTAIRE */}
          {blanchiment.length > 0 && (
            <div className="mt-9 border-t-2 border-charcoal pt-7">
              <h3 className="font-serif text-2xl text-charcoal italic sm:text-3xl">
                Blanchiment dentaire :
              </h3>
              <ul className="mt-4 divide-y divide-stone/40">
                {blanchiment.map((service) => (
                  <li
                    key={service.id}
                    className="flex items-center justify-between gap-4 py-3.5"
                  >
                    <div className="flex items-start gap-3.5 sm:items-center">
                      {shouldShowImage(service) && service.imageUrl ? (
                        <img
                          src={optimizeCloudinaryUrl(service.imageUrl, 180)}
                          alt={service.name}
                          width={64}
                          height={64}
                          className="h-14 w-14 shrink-0 border border-stone/70 bg-paper object-cover sm:h-16 sm:w-16"
                        />
                      ) : null}
                      <div>
                        <p className="font-serif text-xl text-charcoal italic sm:text-2xl">
                          {service.name}
                        </p>
                        <p className="mt-0.5 text-xs text-taupe">{service.description}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleBookClick(service, 'standard')}
                      className="min-h-[44px] shrink-0 px-2 font-serif text-2xl text-charcoal underline-offset-4 hover:underline"
                    >
                      {service.fullPrice}€
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* NOTE DISPONIBILITÉS */}
          <div className="mt-9 border-t border-stone/70 bg-ivory/70 p-4 text-center text-xs leading-relaxed text-charcoal/85 sm:p-5">
            <p className="font-medium tracking-wide uppercase">
              Créneaux flexibles — Disponibilités & Supplément
            </p>
            <p className="mt-1.5 text-taupe">{data.config.bookingRules.supplementNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
