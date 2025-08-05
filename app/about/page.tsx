import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Mail, Linkedin, Heart, Target, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <img
              src="/images/authors/seda-tokmak.jpeg"
              alt="Seda Tokmak"
              className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg"
            />
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Merhaba, Ben <span className="gradient-text">Seda</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              100leşme yolculuğunun yazarı, yürüyeni ve en çok da tanığı
            </p>
          </div>
        </div>

        {/* Ana Hikaye */}
        <div className="prose prose-lg max-w-none mb-16">
          <Card className="glass p-8 mb-8">
            <CardContent className="p-0">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Heart className="mr-2 h-6 w-6 text-primary" />
                Benim Hikayem
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  100leşme yolculuğunun yazarı, yürüyeni ve en çok da tanığıyım.
                  Bugüne kadar okudum, çalıştım, çabaladım, uyum sağladım.
                  Bazen birileri tarafından yönetildim, bazen de ben yönettim.
                </p>
                <p>
                  "Hayatı iyi yaşamak" için gerekli denilen her şeyi, sırayla yaptım.
                  Ama bir gün... Tüm bu "başarı" listelerine rağmen aynaya baktığımda, 
                  gözlerimde bir boşluk gördüm.
                </p>
                <blockquote className="border-l-4 border-primary pl-4 italic text-lg">
                  "Bu hayat gerçekten benim mi?"
                </blockquote>
                <p>
                  O gün durdum. Sadece bir günü, bir kararı ya da bir ilişkiyi değil…
                  Koca bir hayatı sorguladım. Kim için yaşıyordum? Ne için karar alıyordum?
                  Ve en önemlisi: Ben kimdim?
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profesyonel Kimlik */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="glass">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Target className="mr-2 h-5 w-5 text-primary" />
                Profesyonel Hayatım
              </h3>
              <div className="space-y-3">
                <Badge variant="outline" className="mr-2 mb-2">Mühendis</Badge>
                <Badge variant="outline" className="mr-2 mb-2">Genel Müdür</Badge>
                <Badge variant="outline" className="mr-2 mb-2">Lider</Badge>
                <Badge variant="outline" className="mr-2 mb-2">Anne</Badge>
                <p className="text-sm text-muted-foreground mt-4">
                  25+ yılı aşkın profesyonel tecrübemle, Saica Pack Türkiye'de Genel Müdür 
                  olarak görev yapıyorum. Ekipleri güçlendiren, insana değer veren ve 
                  sürdürülebilir başarıyı hedefleyen bir liderlik anlayışı benimsiyorum.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                Liderlik Felsefem
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Anlamlı başarının ancak birlikte üretmekle mümkün olduğuna inanırım</li>
                <li>• Farklı sesleri duyurmak ve güven kültürü inşa etmek önceliğimdir</li>
                <li>• İşin merkezine daima insanı koyarım</li>
                <li>• Değer temelli bir liderlik modeli uygularım</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 100leşme Nedir */}
        <Card className="glass mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">100leşme Nedir?</h2>
            <p className="text-muted-foreground text-center mb-6">
              100leşme, sorularla başlayan bir içsel kalkışmadır. 
              Dışarıdan sessiz ama içten bir devrim gibidir.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Bu blog değildir:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>❌ Yol göstermeye çalışan bir rehber</li>
                  <li>❌ Günlük</li>
                  <li>❌ Şikâyet defteri</li>
                  <li>❌ Özlü söz arşivi</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Bu blog:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✅ Kendisiyle karşılaşmaya cesaret edenlerin sesi</li>
                  <li>✅ Kaybolduklarında yeniden yön bulanların haritası</li>
                  <li>✅ "Yalnız olmadığını bilmenin" verdiği derin huzur</li>
                  <li>✅ Kendi yüzleşmemi yazma alanım</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* İletişim */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Benimle İletişime Geç</h2>
          <p className="text-muted-foreground mb-8">
            Eğer sen de kendinle 100leşmeye cesaret ediyorsan, hoş geldin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" size="lg">
              <Link href="mailto:100lesmeofficial@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                E-posta Gönder
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="https://linkedin.com/in/seda-tokmak" target="_blank">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
