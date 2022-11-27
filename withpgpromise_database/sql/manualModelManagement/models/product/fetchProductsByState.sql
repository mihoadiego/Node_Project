SELECT * 
FROM public.products p 
WHERE p.is_active = ${status} 
ORDER BY p.created_on DESC;