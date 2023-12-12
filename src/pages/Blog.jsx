import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Form from "../components/Form";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

function Blog() {
	const serverUrl = "http://localhost:3000";
	const navigate = useNavigate();

	// initial loading data
	let initCategories = false;
	let initTags = false;
	let initArticles = false;

	// states
	const [articles, setArticles] = useState([]);
	const [categories, setCategories] = useState([]);
	const [tags, setTags] = useState([]);
	const [showOverlay, setShowOverlay] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [formErrors, setFormErrors] = useState({});
	const [articleData, setArticleData] = useState({
		title: "",
		author: "",
		content: "",
		image: "",
		category: "",
		tags: {},
		published: false,
	});

	// Carica categorie e tag all'avvio
	useEffect(() => {
		if (initCategories) {
			return;
		}
		fetchCategories();
	}, []);

	useEffect(() => {
		if (initTags) {
			return;
		}
		fetchTags();
	}, []);

	useEffect(() => {
		if (initArticles) {
			return;
		}
		fetchArticles();
	}, []);

	// Funzione per caricare le categorie dal server
	async function fetchCategories() {
		try {
			const response = await fetch(`${serverUrl}/categories`);
			const data = await response.json();
			setCategories(data);
			initCategories = true;
		} catch (error) {
			console.log("Errore di rete nel caricamento delle categorie", error);
		}
	}

	// Funzione per caricare i tag dal server
	async function fetchTags() {
		try {
			const response = await fetch(`${serverUrl}/tags`);
			const data = await response.json();
			setTags(data);
			initTags = true;
		} catch (error) {
			console.log("Errore di rete nel caricamento dei tag", error);
		}
	}

	// Funzione per caricare gli articoli dal server
	async function fetchArticles() {
		try {
			const response = await fetch(`${serverUrl}/posts`);
			const data = await response.json();
			setArticles(data);
			initArticles = true;
		} catch (error) {
			console.log("Errore di rete nel caricamento degli articoli", error);
		}
	}

	// Salva i dati nel database
	async function saveArticle(article) {
		const formData = new FormData();

		for (let [key, value] of article.entries()) {
			formData.append(key, value);
		}

		console.log("FormData:", formData);

		if (article.imageFile) {
			formData.append("image", article.imageFile);
		}
		try {
			const response = await fetch(`${serverUrl}/posts`, {
				method: "POST",
				body: formData,
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const savedArticle = await response.json();
			console.log("Articolo salvato:", savedArticle.post);
			setArticles((prevArticles) => [...prevArticles, savedArticle.post]);
			resetForm();
		} catch (error) {
			console.log("Errore nel salvataggio dell'articolo:", error);
		}
	}

	// Aggiorna i dati nel database
	async function updateArticle(article) {
		const formData = new FormData();

		// Utilizza il metodo 'get' per accedere ai valori in 'article' che è un oggetto FormData
		formData.append("title", article.get("title"));
		formData.append("author", article.get("author"));
		formData.append("content", article.get("content"));
		formData.append("published", article.get("published"));
		formData.append("categoryId", article.get("categoryId"));

		for (let tag of article.getAll("tags[]")) {
			formData.append("tags[]", tag);
		}

		// Gestisci l'immagine
		const imageFile = article.get("image");
		if (imageFile) {
			formData.append("image", imageFile);
		}

		// Recupera lo slug per l'URL della richiesta
		const slug = article.get("slug");

		// Stampa per debug
		for (let [key, value] of formData.entries()) {
			console.log(key, value);
		}

		try {
			const response = await fetch(`${serverUrl}/posts/${slug}`, {
				method: "PATCH",
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const updatedArticle = await response.json();
			setArticles((prevArticles) =>
				prevArticles.map((a) =>
					a.id === updatedArticle.id ? updatedArticle : a,
				),
			);
			resetForm();
		} catch (error) {
			console.error("Errore durante l'aggiornamento dell'articolo:", error);
		}
	}

	// validate form
	function validateForm(data) {
		let errors = {};
		if (!data.title) errors.title = "Il titolo è obbligatorio";
		if (!data.author) errors.author = "L'autore è obbligatorio";
		if (!data.content) errors.content = "Il contenuto è obbligatorio";
		if (!data.category) errors.category = "Il contenuto è obbligatorio";
		if (!data.tags) errors.tags = "Il contenuto è obbligatorio";
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	}

	async function handleDelete(articleId) {
		try {
			// Trova l'articolo da eliminare per ottenere il suo slug
			const articleToDelete = articles.find(
				(article) => article.id === articleId,
			);
			if (!articleToDelete) {
				throw new Error("Articolo non trovato");
			}
			// Invia richiesta DELETE al server usando lo slug
			const response = await fetch(
				`${serverUrl}/posts/${articleToDelete.slug}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			if (!response.ok) {
				throw new Error("Errore nella cancellazione dell'articolo");
			}
			// Aggiorna lo stato rimuovendo l'articolo cancellato
			const updatedArticles = articles.filter(
				(article) => article.id !== articleId,
			);
			setArticles(updatedArticles);
		} catch (error) {
			console.error("Errore nella cancellazione dell'articolo:", error);
		}
	}

	// Funzione per resettare il form
	function resetForm() {
		setArticleData({
			title: "",
			author: "",
			content: "",
			image: "",
			category: "",
			tags: {},
			published: false,
		});
		setIsEditing(false);
		setShowOverlay(false);
		setFormErrors({});
	}

	// functions
	function handleChange(event) {
		const {name, value, checked, type, files} = event.target;
		if (name === "image" && files.length > 0) {
			setArticleData({...articleData, imageFile: files[0]});
		} else if (type === "checkbox" && name === "tags") {
			setArticleData((prevState) => ({
				...prevState,
				tags: {
					...prevState.tags,
					[value]: checked,
				},
			}));
		} else {
			setArticleData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	}

	function handleEdit(articleId) {
		setIsEditing(true);
		const articleToEdit = articles.find((article) => article.id === articleId);
		const articleTags = {};
		articleToEdit.tags.forEach((tag) => {
			articleTags[tag.id] = true;
		});
		setArticleData({
			...articleToEdit,
			tags: articleTags,
			category: articleToEdit.category.id,
			slug: articleToEdit.slug,
			imageUrl: articleToEdit.image,
		});
		setShowOverlay(true);
	}

	function handleFormSubmit(event) {
		event.preventDefault();
		if (!validateForm(articleData)) {
			return;
		}
		const formData = new FormData();
		formData.append("title", articleData.title);
		formData.append("slug", articleData.slug);
		formData.append("content", articleData.content);
		formData.append("published", articleData.published.toString());
		formData.append("categoryId", articleData.category);
		formData.append("author", articleData.author);
		// Prepara i tags come array di oggetti e li serializza in stringa JSON
		const tagsArray = Object.keys(articleData.tags)
			.filter((tagId) => articleData.tags[tagId])
			.map((tagId) => parseInt(tagId));
		tagsArray.forEach((tagId) => {
			formData.append("tags[]", tagId);
		});

		if (articleData.imageFile) {
			formData.append("image", articleData.imageFile);
		}

		if (isEditing) {
			updateArticle(formData);
		} else {
			saveArticle(formData);
		}
	}

	async function handleChangePublished(articleId) {
		const articleToChange = articles.find(
			(article) => article.id === articleId,
		);
		if (!articleToChange) return;

		const newPublishedStatus = !articleToChange.published;

		// Crea un oggetto FormData e aggiungi il campo 'published'
		const formData = new FormData();
		formData.append("published", newPublishedStatus);

		try {
			const response = await fetch(
				`${serverUrl}/posts/${articleToChange.slug}`,
				{
					method: "PATCH", // o 'PUT', a seconda della configurazione del server
					body: formData,
				},
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const updatedArticle = await response.json();

			// Aggiorna lo stato degli articoli nel frontend
			setArticles((prevArticles) =>
				prevArticles.map((article) => {
					return article.id === articleId ? updatedArticle : article;
				}),
			);

			if (newPublishedStatus) {
				alert("Questo articolo è stato impostato come pubblicato!");
			}
		} catch (error) {
			console.error(
				"Errore durante l'aggiornamento dello stato di pubblicazione dell'articolo:",
				error,
			);
		}
	}

	function closeOverlay() {
		setShowOverlay(false);
		setIsEditing(false);
		resetForm();
	}

	function handleArticleClick(slug) {
		navigate(`/blog/${slug}`);
	}

	return (
		<div>
			{showOverlay && (
				<Form
					articleData={articleData}
					handleChange={handleChange}
					handleFormSubmit={handleFormSubmit}
					closeOverlay={closeOverlay}
					isEditing={isEditing}
					categories={categories}
					tags={tags}
					formErrors={formErrors}
					serverUrl={serverUrl}
				/>
			)}

			{/* Floating Button */}
			<button
				className="fixed bottom-10 right-10 bg-blue-500 text-white text-4xl  w-20 h-20 rounded-full shadow-lg"
				onClick={() => setShowOverlay(true)}>
				<i className="fa-solid fa-file-import"></i>
			</button>

			<div>
				{articles.map((article) => (
					<Card
						key={article.id}
						article={article}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
						handleChangePublished={handleChangePublished}
						isEditing={isEditing}
						serverUrl={serverUrl}
						onArticleClick={() => handleArticleClick(article.slug)}
					/>
				))}
			</div>
		</div>
	);
}

export default Blog;
