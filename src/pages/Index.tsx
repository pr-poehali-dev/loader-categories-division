import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type LoaderCategory = 'all' | 'light' | 'medium' | 'heavy';

interface Loader {
  id: number;
  name: string;
  category: LoaderCategory;
  weight: string;
  price: string;
  bucket: string;
  image: string;
  description: string;
}

const loaders: Loader[] = [
  {
    id: 1,
    name: 'Фронтальный погрузчик LW300',
    category: 'light',
    weight: '3 тонны',
    price: '1 500 000',
    bucket: '0.8 - 1.8 м³',
    image: 'https://cdn.poehali.dev/projects/ecfc2e5c-044f-45ff-b51c-a3d3565dfdb6/files/f8f5ca61-141d-4576-a396-013888b36893.jpg',
    description: 'Идеален для строительных площадок и коммунальных работ'
  },
  {
    id: 2,
    name: 'Фронтальный погрузчик LW500',
    category: 'light',
    weight: '5 тонн',
    price: '2 200 000',
    bucket: '1.5 - 2.0 м³',
    image: 'https://cdn.poehali.dev/projects/ecfc2e5c-044f-45ff-b51c-a3d3565dfdb6/files/f8f5ca61-141d-4576-a396-013888b36893.jpg',
    description: 'Универсальная модель для КФХ и строительства'
  },
  {
    id: 3,
    name: 'Фронтальный погрузчик LW800',
    category: 'light',
    weight: '8 тонн',
    price: '3 000 000',
    bucket: '2.0 - 3.0 м³',
    image: 'https://cdn.poehali.dev/projects/ecfc2e5c-044f-45ff-b51c-a3d3565dfdb6/files/f8f5ca61-141d-4576-a396-013888b36893.jpg',
    description: 'Мощный легкий погрузчик с большим ковшом'
  },
  {
    id: 4,
    name: 'Фронтальный погрузчик LW900',
    category: 'medium',
    weight: '9 тонн',
    price: '3 900 000',
    bucket: '1.8 - 2.5 м³',
    image: 'https://cdn.poehali.dev/projects/ecfc2e5c-044f-45ff-b51c-a3d3565dfdb6/files/d60634d9-1760-46f4-a06f-5cafa6e579e5.jpg',
    description: 'Для лесных и дорожно-строительных работ'
  },
  {
    id: 5,
    name: 'Фронтальный погрузчик LW1200',
    category: 'medium',
    weight: '12 тонн',
    price: '5 500 000',
    bucket: '2.5 - 3.0 м³',
    image: 'https://cdn.poehali.dev/projects/ecfc2e5c-044f-45ff-b51c-a3d3565dfdb6/files/d60634d9-1760-46f4-a06f-5cafa6e579e5.jpg',
    description: 'Средний погрузчик для коммунальных работ'
  },
  {
    id: 6,
    name: 'Фронтальный погрузчик LW1800',
    category: 'heavy',
    weight: '18 тонн',
    price: '12 000 000',
    bucket: '4.0 - 5.0 м³',
    image: 'https://cdn.poehali.dev/projects/ecfc2e5c-044f-45ff-b51c-a3d3565dfdb6/files/012da415-6ed0-4576-a098-ba3aa34c4272.jpg',
    description: 'Тяжелый погрузчик для угольных разрезов'
  },
  {
    id: 7,
    name: 'Фронтальный погрузчик LW2100',
    category: 'heavy',
    weight: '21 тонна',
    price: '21 000 000',
    bucket: '5.0 - 7.0 м³',
    image: 'https://cdn.poehali.dev/projects/ecfc2e5c-044f-45ff-b51c-a3d3565dfdb6/files/012da415-6ed0-4576-a098-ba3aa34c4272.jpg',
    description: 'Максимальная мощность для карьеров'
  }
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<LoaderCategory>('all');
  const [activeSection, setActiveSection] = useState('catalog');
  const [formData, setFormData] = useState({ name: '', phone: '', model: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const filteredLoaders = selectedCategory === 'all' 
    ? loaders 
    : loaders.filter(loader => loader.category === selectedCategory);

  const categoryInfo = {
    light: { label: 'Легкие', range: '2-8 тонн', color: 'bg-green-500' },
    medium: { label: 'Средние', range: '9-12 тонн', color: 'bg-yellow-500' },
    heavy: { label: 'Тяжелые', range: '13-21 тонн', color: 'bg-red-500' }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Truck" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-secondary">ВСЕ-МТ</h1>
          </div>
          
          <nav className="hidden md:flex gap-6">
            {['catalog', 'delivery', 'warranty', 'contacts'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === section ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {section === 'catalog' && 'Каталог'}
                {section === 'delivery' && 'Доставка'}
                {section === 'warranty' && 'Гарантия'}
                {section === 'contacts' && 'Контакты'}
              </button>
            ))}
          </nav>

          <Button size="lg" className="hidden md:flex gap-2">
            <Icon name="Phone" size={18} />
            Позвонить
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Menu" size={24} />
          </Button>
        </div>
      </header>

      {activeSection === 'catalog' && (
        <>
          <section className="relative bg-gradient-to-br from-secondary via-secondary/90 to-primary text-white py-20 overflow-hidden">
            <div className="container relative z-10">
              <div className="max-w-3xl animate-fade-in">
                <Badge className="mb-4 bg-primary/20 text-white border-white/20">
                  Официальный дилер
                </Badge>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Фронтальные погрузчики от производителя
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Широкий выбор спецтехники для строительства, коммунальных и лесозаготовительных работ. 
                  От 1.5 млн рублей. Гарантия и сервис.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" variant="secondary" className="gap-2 text-lg px-8">
                    <Icon name="Phone" size={20} />
                    Получить консультацию
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2 text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <Icon name="FileText" size={20} />
                    Скачать каталог
                  </Button>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
              <Icon name="Truck" size={400} className="absolute -right-20 top-1/2 -translate-y-1/2" />
            </div>
          </section>

          <section className="py-16 bg-muted/30">
            <div className="container">
              <div className="text-center mb-12 animate-fade-in">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Каталог техники</h3>
                <p className="text-muted-foreground text-lg">Выберите категорию по весу погрузчика</p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button
                  size="lg"
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  className="gap-2"
                >
                  <Icon name="Grid3x3" size={20} />
                  Все погрузчики
                </Button>

                {Object.entries(categoryInfo).map(([key, info]) => (
                  <Button
                    key={key}
                    size="lg"
                    variant={selectedCategory === key ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(key as LoaderCategory)}
                    className="gap-2"
                  >
                    <div className={`w-3 h-3 rounded-full ${info.color}`} />
                    {info.label} <span className="text-muted-foreground">({info.range})</span>
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLoaders.map((loader, index) => (
                  <Card 
                    key={loader.id} 
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-64 overflow-hidden bg-muted">
                      <img 
                        src={loader.image} 
                        alt={loader.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <Badge 
                        className={`absolute top-4 right-4 ${
                          categoryInfo[loader.category as keyof typeof categoryInfo].color
                        } text-white`}
                      >
                        {categoryInfo[loader.category as keyof typeof categoryInfo].label}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-2">{loader.name}</h4>
                      <p className="text-muted-foreground text-sm mb-4">{loader.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Weight" size={16} className="text-primary" />
                          <span className="font-medium">Масса:</span> {loader.weight}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Box" size={16} className="text-primary" />
                          <span className="font-medium">Ковш:</span> {loader.bucket}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <p className="text-sm text-muted-foreground">Цена от</p>
                          <p className="text-2xl font-bold text-primary">
                            {parseInt(loader.price).toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                        <Button className="gap-2">
                          <Icon name="MessageCircle" size={18} />
                          Узнать больше
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-secondary text-white">
            <div className="container">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="animate-fade-in">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Shield" size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Гарантия качества</h4>
                  <p className="text-white/80">Официальная гарантия от производителя</p>
                </div>
                
                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Truck" size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Доставка по России</h4>
                  <p className="text-white/80">Организуем доставку в любой регион</p>
                </div>
                
                <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Wrench" size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Сервисное обслуживание</h4>
                  <p className="text-white/80">Полный цикл технической поддержки</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {activeSection === 'delivery' && (
        <section className="py-16 container">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8">Доставка техники</h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>Мы организуем доставку фронтальных погрузчиков в любой регион России и СНГ.</p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <Card className="p-6">
                  <Icon name="MapPin" size={32} className="text-primary mb-4" />
                  <h4 className="text-xl font-bold mb-2 text-foreground">По России</h4>
                  <p>Доставка автотранспортом или ж/д платформой. Сроки от 5 дней.</p>
                </Card>
                
                <Card className="p-6">
                  <Icon name="Globe" size={32} className="text-primary mb-4" />
                  <h4 className="text-xl font-bold mb-2 text-foreground">СНГ и экспорт</h4>
                  <p>Полное таможенное сопровождение и логистика.</p>
                </Card>
              </div>

              <p>Стоимость доставки рассчитывается индивидуально в зависимости от региона и модели техники.</p>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'warranty' && (
        <section className="py-16 container">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8">Гарантия</h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>На всю спецтехнику предоставляется официальная гарантия производителя.</p>
              
              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg my-8">
                <h4 className="text-xl font-bold mb-2 text-foreground">Условия гарантии:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Гарантийный срок: 12 месяцев или 2000 моточасов</li>
                  <li>Бесплатное сервисное обслуживание в течение гарантийного периода</li>
                  <li>Замена неисправных узлов и агрегатов</li>
                  <li>Консультации по эксплуатации 24/7</li>
                </ul>
              </div>

              <p>Сервисные центры расположены в крупных городах России. Выездной ремонт на месте эксплуатации техники.</p>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="py-16 container">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8">Контакты</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <h4 className="text-2xl font-bold mb-6">Свяжитесь с нами</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Icon name="Phone" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Телефон</p>
                      <p className="text-muted-foreground">+7 (XXX) XXX-XX-XX</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Icon name="Mail" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">info@vse-mt.ru</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Icon name="MapPin" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Адрес</p>
                      <p className="text-muted-foreground">Москва, Россия</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Icon name="Clock" size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Режим работы</p>
                      <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00<br />Сб-Вс: выходной</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-muted/50">
                <h4 className="text-2xl font-bold mb-6">Оставьте заявку</h4>
                <form className="space-y-4" onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  setSubmitMessage('');
                  
                  try {
                    const response = await fetch('https://functions.poehali.dev/885f8fb7-16b5-4208-bbf2-cc77c827127b', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(formData)
                    });
                    
                    const result = await response.json();
                    
                    if (response.ok) {
                      setSubmitMessage('✅ Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
                      setFormData({ name: '', phone: '', model: '' });
                    } else {
                      setSubmitMessage(`❌ Ошибка: ${result.error || 'Не удалось отправить заявку'}`);
                    }
                  } catch (error) {
                    setSubmitMessage('❌ Ошибка соединения. Проверьте настройки email.');
                  } finally {
                    setIsSubmitting(false);
                  }
                }}>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg border bg-background"
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Телефон</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-2 rounded-lg border bg-background"
                      placeholder="+7 (999) 999-99-99"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Интересующая модель</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg border bg-background"
                      placeholder="LW500"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    />
                  </div>

                  {submitMessage && (
                    <div className={`p-4 rounded-lg text-sm ${
                      submitMessage.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {submitMessage}
                    </div>
                  )}

                  <Button className="w-full gap-2" size="lg" type="submit" disabled={isSubmitting}>
                    <Icon name="Send" size={18} />
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-secondary text-white py-12 mt-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Truck" size={28} className="text-primary" />
                <h3 className="text-xl font-bold">ВСЕ-МТ</h3>
              </div>
              <p className="text-white/70 text-sm">
                Официальный дилер фронтальных погрузчиков. Продажа, доставка, сервис.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Легкие погрузчики</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Средние погрузчики</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Тяжелые погрузчики</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Навесное оборудование</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Гарантия</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Связаться</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>+7 (XXX) XXX-XX-XX</li>
                <li>info@vse-mt.ru</li>
                <li className="pt-4">
                  <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                    Заказать звонок
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/50">
            <p>© 2024 ВСЕ-МТ. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}